import {
  Component,
  inject,
  AfterViewInit, signal, effect
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {SourceConfigService} from '../../services/source-config.service';
import {DialogMode} from '../../../../shared/enums/dialog';
import {AppSource, CreateSourceDto, UpdateSourceDto} from '../../models/source';
import {AppSourceType, SourceTypeDto} from '../../../source-type/models/source-type';
import {JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {AppProject} from '../../../project/models/project';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {SourceStore} from '../../services/source.store';
import {form, FormField} from '@angular/forms/signals';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/searchable-multi-select/searchable-multi-select';
import {ProjectStore} from '../../../project/services/project.store';

export interface SourceForm {
  id: string;
  sourceId: string;
  sourceName: string;
  expectedSourceName: string;
  sourceType: SourceTypeDto | null;
  attributes: Record<string, string>;
}

export interface StoredSourceDialog {
  mode: DialogMode;
  entity?: AppSource;
  model: SourceForm;
}

@Component({
  selector: 'app-source-dialog',
  templateUrl: './source-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    TranslatePipe,
    MatInput,
    MatError,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    JsonPipe,
    SearchableMultiSelectComponent
  ]
})
export class SourceDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected localeService = inject(LocaleService);
  protected store = inject(SourceStore);
  private projectStore = inject(ProjectStore);
  protected configService = inject(SourceConfigService);
  private dialogRef = inject(MatDialogRef<SourceDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppSource;
    project: AppProject;
    sourceTypeFullList: AppSourceType[];
    restoredModel: SourceForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<SourceForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    sourceId: this.dialogData.entity?.sourceId ?? '',
    sourceType: this.dialogData.entity?.sourceType ?? null,
    sourceName: this.dialogData.entity?.sourceName ?? '',
    expectedSourceName: this.dialogData.entity?.expectedSourceName ?? '',
    attributes: {
      ...this.dialogData.entity?.attributes,
      'External-identifier': this.dialogData.entity?.attributes?.['External-identifier'] ?? '',
    },
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
      case DialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
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

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(model: SourceForm) {
    const selectedSource = this.store.selected();
    if (!selectedSource) return;

    const project = this.dialogData.project;
    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'sources', model.sourceName, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    const project = this.dialogData.project;
    this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'sources'], {queryParamsHandling: 'preserve'}).then();
  }

  toCreateDtoModel(model: SourceForm): CreateSourceDto {
    return {
      ...model,
      sourceType: model.sourceType ?? undefined,
      assigned: false,
      project: this.projectStore.selected()!,
    };
  }

  toUpdateDtoModel(model: SourceForm): UpdateSourceDto {
    return {
      ...model,
      id: Number(model.id),
      sourceType: model.sourceType ?? undefined,
      project: this.projectStore.selected()!
    };
  }
}
