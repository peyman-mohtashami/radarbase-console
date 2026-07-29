import {
  Component,
  inject,
  AfterViewInit, signal
} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {AppGroup, CreateGroupDto, UpdateGroupDto} from "../../models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {GroupConfigService} from '../../services/group-config.service';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {GroupStore} from '../../services/group.store';
import {form, FormField} from '@angular/forms/signals';
import {ProjectStore} from '../../../project/services/project.store';
import {JsonPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';

export interface GroupForm {
  id: string;
  name: string;
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
    DialogActionsComponent,
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
  protected readonly DialogAction = DialogAction;

  protected localeService = inject(LocaleService);
  protected store = inject(GroupStore);
  private projectStore = inject(ProjectStore);
  protected configService = inject(GroupConfigService);
  private dialogRef = inject(MatDialogRef<GroupDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
      id: string;
      mode: DialogMode;
      entity?: AppGroup;
      groupFullList: AppGroup[];
  };

  formFields = this.configService.getFormFields();

  private model = signal<GroupForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    name: this.dialogData.entity?.name ?? '',
  });

  protected form = form(this.model);

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  async onAction($event: DialogAction) {
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        await this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        await this.handleSaveAction();
        break;
    }
  }

  protected async handleSaveAction(): Promise<void> {
    this.configService.setLatestFormEntry(this.model());

    if (this.dialogData.mode === DialogMode.ADD) {
      await this.store.add(this.toCreateDtoModel(this.model()));
    } else if (this.dialogData.mode === DialogMode.EDIT) {
      await this.store.update(this.toUpdateDtoModel(this.model()));
    }

    if (this.store.error()) return;

    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model().name);
  }

  protected async handleDeleteAction(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }



  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(entityName: string) {
    const selectedOrganization = this.store.selected();
    if (!selectedOrganization) return;



    const urlTree = this.router.parseUrl(this.router.url);
    const primaryRoute = urlTree.root.children['primary'];

    if (!primaryRoute) {
      return;
    }

    const segments = primaryRoute.segments.map(segment => segment.path);
    const organizationsIndex = segments.indexOf('organizations');
    const organizationNameIndex = organizationsIndex + 1;

    const hasOrganizationNameInUrl =
      organizationsIndex !== -1 &&
      organizationNameIndex < segments.length;

    if (!hasOrganizationNameInUrl) {
      return;
    }

    segments[organizationNameIndex] = entityName;

    this.router.navigate(segments, {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/organizations'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: GroupForm): CreateGroupDto {
    return {
      ...model,
      projectId: this.projectStore.selected()!.id,
      projectName: this.projectStore.selected()!.name
    };
  }

  toUpdateDtoModel(model: GroupForm): UpdateGroupDto {
    return {
      ...model,
      id: Number(model.id),
      projectId: this.projectStore.selected()!.id,
      projectName: this.projectStore.selected()!.name
    };
  }
  // {extends BaseEntityDialogComponent<AppGroup> {
  // override configService = inject(GroupConfigService);
  // override dialogRef = inject(MatDialogRef<GroupDialogComponent>);
  // override dialogData = inject(MAT_DIALOG_DATA) as {
  //   id: string;
  //   mode: DialogMode;
  //   entity?: AppGroup;
  //   groupFullList: Observable<AppGroup[]>;
  // };
  //
  // override formFields = this.configService.getFormFields();
  //
  // override form = new FormGroup({
  //   id: new FormControl<string | number>({ value: '', disabled: true}, {nonNullable: true}),
  //   name: new FormControl<string>('', {nonNullable: true}),
  // });
  //
  // groupFullList: AppGroup[] = [];
  //
  // override ngOnInit() {
  //   this.dialogData.groupFullList.subscribe(groups => {
  //     this.groupFullList = groups;
  //     this.form.controls.name.addValidators(this.duplicateValidator);
  //   })
  //   super.ngOnInit();
  // }
  //
  // // override handleSaveAction(): void {
  // //   this.dialogActionEvent.emit({
  // //     action: this.dialogData.mode,
  // //     entity: {...this.dialogData.entity, ...this.form?.value},
  // //   });
  // // }
  // //
  // // override handleDeleteAction(): void {
  // //   this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  // // }
  //
  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.groupFullList.find(
  //     (entity) =>
  //       control.value === entity.name && this.dialogData.entity?.name !== entity.name
  //   )
  //     ? { duplicate: true }
  //     : null;
  // }
}
