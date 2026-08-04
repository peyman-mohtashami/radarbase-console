import {Component, inject, AfterViewInit, signal, effect} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AppSourceType, CreateSourceTypeDto, toSourceTypeScope, UpdateSourceTypeDto} from "../../models/source-type";
import {DialogMode} from '../../../../shared/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {ActivatedRoute, Router} from '@angular/router';
import {SourceTypeStore} from '../../services/source-type.store';
import {form, FormField} from '@angular/forms/signals';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {longTextField, normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {JsonPipe} from '@angular/common';
import {getLastSegment} from '../../../../shared/utils/route.util';

export interface SourceTypeForm {
  id: string;
  producer: string;
  model: string;
  catalogVersion: string;
  sourceTypeScope: string;
  canRegisterDynamically: boolean;
  name: string;
  description: string;
  assessmentType: string;
  appProvider: string;
}

export interface StoredSourceTypeDialog {
  mode: DialogMode;
  entity?: AppSourceType;
  model: SourceTypeForm;
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
    restoredModel?: SourceTypeForm;
  };

  protected formFields = this.configService.getFormFields();

  private model = signal<SourceTypeForm>(this.dialogData.restoredModel ?? {
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
    // TODO validator on 3 fields
    requiredField(schema.sourceTypeScope);
    normalTextField(schema.name);
    longTextField(schema.description);
    normalTextField(schema.assessmentType);
  });

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

  async save(): Promise<void> {
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

  navigateOnUpdateSuccess(model: SourceTypeForm) {
    const selectedSourceType = this.store.selected();
    if (!selectedSourceType) return;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/source-types', model.producer, model.model, model.canRegisterDynamically, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
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
