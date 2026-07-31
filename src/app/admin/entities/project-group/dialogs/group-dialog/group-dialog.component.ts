import {
  Component,
  inject,
  AfterViewInit, signal, effect
} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {AppGroup, CreateGroupDto} from "../../models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {GroupConfigService} from '../../services/group-config.service';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {GroupStore} from '../../services/group.store';
import {form, FormField} from '@angular/forms/signals';
import {ProjectStore} from '../../../project/services/project.store';
import {JsonPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {getLastSegment} from '../../../../shared/utils/route.util';

export interface GroupForm {
  id: string;
  name: string;
}

export interface StoredGroupDialog {
  mode: DialogMode;
  entity?: AppGroup;
  model: GroupForm;
}

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './group-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    JsonPipe,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    MatButton
  ]
})
export class GroupDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected localeService = inject(LocaleService);
  protected store = inject(GroupStore);
  private projectStore = inject(ProjectStore);
  protected configService = inject(GroupConfigService);
  private dialogRef = inject(MatDialogRef<GroupDialogComponent>);
  private router = inject(Router);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppGroup;
    groupFullList: AppGroup[];
    restoredModel?: GroupForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<GroupForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    name: this.dialogData.entity?.name ?? '',
  });

  protected form = form(this.model);

  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === DialogMode.ADD || this.dialogData.mode === DialogMode.EDIT) {
        this.configService.setDialogState({
          mode: this.dialogData.mode,
          entity: this.dialogData.entity,
          model,
        });
      }
    });
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    switch(this.dialogData.mode) {
      case DialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }

  private navigateOnUpdateSuccess(model: GroupForm) {
    const selectedGroup = this.store.selected();
    if (!selectedGroup) return;

    const project = this.projectStore.selected()!;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'groups', model.name, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  private navigateOnDeleteSuccess() {
    const project = this.projectStore.selected()!;
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'groups'], { queryParamsHandling: 'preserve' }).then();
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  toCreateDtoModel(model: GroupForm): CreateGroupDto {
    return {
      ...model,
      projectId: this.projectStore.selected()!.id,
      projectName: this.projectStore.selected()!.name
    };
  }

  // toUpdateDtoModel(model: GroupForm): UpdateGroupDto {
  //   return {
  //     ...model,
  //     id: Number(model.id),
  //     projectId: this.projectStore.selected()!.id,
  //     projectName: this.projectStore.selected()!.name
  //   };
  // }
}
