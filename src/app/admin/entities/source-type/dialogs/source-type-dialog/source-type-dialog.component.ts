import {Component, inject, AfterViewInit, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppSourceType, CreateSourceTypeDto, toSourceTypeScope, UpdateSourceTypeDto} from "../../models/source-type";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {
  DialogAction,
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {ActivatedRoute, Router} from '@angular/router';
import {SourceTypeStore} from '../../services/source-type.store';
import {form, FormField, pattern, required} from '@angular/forms/signals';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {longTextField, normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {JsonPipe} from '@angular/common';

export interface SourceTypeForm {
  id: string;
  producer: string;
  model: string;
  catalogVersion: string;
  sourceTypeScope: string; //new FormControl<SourceTypeScope | null>(null, {nonNullable: true, validators: [Validator.requiredValidator]}),
  canRegisterDynamically: boolean; //new FormControl<boolean>(false, {nonNullable: true}),
  name: string;
  description: string;
  assessmentType: string;
  appProvider: string;
}

@Component({
  selector: 'app-source-type-dialog',
  templateUrl: './source-type-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatFormField,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatHint,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    MatDialogActions,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    JsonPipe
  ]
})
export class SourceTypeDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

  protected store = inject(SourceTypeStore);
  private configService = inject(SourceTypeConfigService);
  private dialogRef = inject(MatDialogRef<SourceTypeDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppSourceType;
    sourceTypeFullList: AppSourceType[];
  };

  protected formFields = this.configService.getFormFields();

  private model = signal<SourceTypeForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    producer: this.dialogData.entity?.producer ?? '',
    model: this.dialogData.entity?.model ?? '',
    catalogVersion: this.dialogData.entity?.catalogVersion ?? '',
    sourceTypeScope: this.dialogData.entity?.sourceTypeScope ?? '',
    canRegisterDynamically: !!this.dialogData.entity?.canRegisterDynamically,
    name: this.dialogData.entity?.name ?? '',
    description: this.dialogData.entity?.description ?? '',
    assessmentType: this.dialogData.entity?.assessmentType ?? '',
    appProvider: this.dialogData.entity?.appProvider ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.producer);
    normalTextField(schema.producer);
    requiredField(schema.model);
    normalTextField(schema.model);
    requiredField(schema.catalogVersion);

    requiredField(schema.sourceTypeScope);
    normalTextField(schema.name);
    longTextField(schema.description);
    normalTextField(schema.assessmentType);
  });

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
    this.router.navigate(['/admin/source-types'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: SourceTypeForm): CreateSourceTypeDto {
    return {
      ...model,
      sourceTypeScope: toSourceTypeScope(this.model().sourceTypeScope),
    };
  }

  toUpdateDtoModel(model: SourceTypeForm): UpdateSourceTypeDto {
    return {
      ...model,
      id: Number(model.id),
      sourceTypeScope: toSourceTypeScope(this.model().sourceTypeScope),
    };
  }



  // override form = new FormGroup({
  //   id: new FormControl<string | number>({ value: '', disabled: true }, {nonNullable: true}),
  //   producer: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
  //   model: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
  //   catalogVersion: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator]}),
  //   sourceTypeScope: new FormControl<SourceTypeScope | null>(null, {nonNullable: true, validators: [Validator.requiredValidator]}),
  //   canRegisterDynamically: new FormControl<boolean>(false, {nonNullable: true}),
  //   name: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  //   description: new FormControl<string>("", {validators: [Validator.longTextValidator]}),
  //   assessmentType: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  //   appProvider: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  // });
}
