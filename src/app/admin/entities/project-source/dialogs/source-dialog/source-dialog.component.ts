import {
  Component,
  inject,
  ChangeDetectionStrategy, AfterViewInit, signal
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {
  MatSelectAutocompleteComponent,
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {SourceConfigService} from '../../services/source-config.service';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {AppSource, CreateSourceDto, UpdateSourceDto} from '../../models/source';
import {AppSourceType} from '../../../source-type/models/source-type';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {AsyncPipe, JsonPipe} from '@angular/common';
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

export interface SourceForm {
  id: string;
  sourceId: string;
  sourceName: string;
  expectedSourceName: string;
  sourceType: string;
  attributes: Record<string, string>;
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
    MatSelectAutocompleteComponent,
    DialogActionsComponent,
    AsyncPipe,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    JsonPipe
  ]
})
export class SourceDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

  protected localeService = inject(LocaleService);
  protected store = inject(SourceStore);
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
  };

  formFields = this.configService.getFormFields();

  private model = signal<SourceForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    sourceId: this.dialogData.entity?.sourceId ?? '',
    sourceType: `${this.dialogData.entity?.sourceType?.id ?? ''}`,
    sourceName: this.dialogData.entity?.sourceName ?? '',
    expectedSourceName: this.dialogData.entity?.expectedSourceName ?? '',
    attributes: this.dialogData.entity?.attributes ?? {},
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
    this.navigateOnUpdateSuccess(this.model().sourceName);
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

  toCreateDtoModel(model: SourceForm): CreateSourceDto {
    return {
      ...model,
      sourceType: this.dialogData.sourceTypeFullList.find(s => `${s.id}` === model.sourceType),
    };
  }

  toUpdateDtoModel(model: SourceForm): UpdateSourceDto {
    return {
      ...model,
      id: Number(model.id),
      sourceType: this.dialogData.sourceTypeFullList.find(s => `${s.id}` === model.sourceType),
    };
  }


  // override form = new FormGroup({
  //   id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
  //   sourceId: new FormControl<string | undefined>({value: undefined, disabled: true}, {nonNullable: true}),
  //   sourceName: new FormControl<string | undefined>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
  //   expectedSourceName: new FormControl<string | undefined>("", {nonNullable: true}),
  //   sourceType: new FormControl<SourceTypeDto | undefined>(undefined, {nonNullable: true, validators: [Validator.requiredValidator]}),
  //   attributes: new FormGroup({
  //     "External-identifier": new FormControl<string | undefined>(undefined, {nonNullable: true, validators: [Validator.normalTextValidator]}),
  //   }),
  // });
}
