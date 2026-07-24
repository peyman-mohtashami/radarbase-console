import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
  output,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  // AbstractControl, FormControl, FormGroup,
  ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

// import {Validator} from '../../../../../../shared/utils/validators';
import { AppOrganization } from "../../models/organization";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
// import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable, Subject} from 'rxjs';
import {form, FormField, pattern, required, validate} from '@angular/forms/signals';
// import {BaseConfigService} from '../../../../../base-entities/services/base-config.service';
import {HttpErrorResponse} from '@angular/common/http';
// import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TranslatePipe,
    MatHint,
    MatError,
    MatFormField,
    DialogActionsComponent,
    DialogActionsComponent,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
  ]
})
export class OrganizationDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  protected readonly DialogMode = DialogMode;

  configService = inject(OrganizationConfigService);
  dialogRef = inject(MatDialogRef<OrganizationDialogComponent>);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppOrganization | undefined;
    organizationFullList: Observable<AppOrganization[]>;
  };

  formFields = this.configService.getFormFields();

  model = signal<AppOrganization>({
    name: '',
    description: '',
    location: '',
    id: '',
    _name: '',
    _search: ''
  });

  form2 = form(this.model, (schema) => {
    required(schema.name);
    pattern(schema.name, /^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/, {
      message: 'SHARED.validatorError.normalTextValidator',
    });
    validate(schema.name, ({value}) => {
      return this.organizationFullList.find(
        entity =>
          value() === entity.name && this.dialogData.entity?.name !== entity.name
      ) ? {kind: 'duplicate', message: 'SHARED.validatorError.duplicate' } : null;
    });
    pattern(schema.description, /^.{1,255}$/m, {
      message: 'SHARED.validatorError.longTextValidator',
    });
    pattern(schema.location, /^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/, {
      message: 'SHARED.validatorError.longTextValidator',
    });
  });

  // override form = new FormGroup({
  //   id: new FormControl<string | number>({value: "", disabled: true}, {nonNullable: true}),
  //   name: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
  //   description: new FormControl<string>("", {validators: [Validator.longTextValidator]}),
  //   location: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  // });

  // organizationFullList: AppOrganization[] = [];

  // formFields: Record<string, boolean> | undefined;

  // form: AbstractControl<unknown> = new FormGroup({});

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode | string, entity?: AppOrganization }>();

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    // this.formFields = this.configService.getFormFields();
    if (this.dialogData.entity) {
      this.model.set(this.dialogData.entity);
    }
    // if (this.dialogData.entity) this.form.patchValue(this.dialogData.entity);
    // this.form.valueChanges.pipe(debounceTime(300), takeUntil(this._destroy$)).subscribe((value) => {
    //   if (value) {
    //     this.error.set(null);
    //   }
    // })
  }
  // override ngOnInit() {
  //   this.dialogData.organizationFullList.subscribe(organizations => {
  //     this.organizationFullList = organizations;
  //     this.form.controls.name.addValidators(this.duplicateValidator);
  //   });
  //   super.ngOnInit();
  // }


  ngAfterViewInit() {
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    setTimeout(() => {
      panel?.classList.add('dialog-enter-active');
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onAction($event: DialogAction) {
    this.error.set(null);
    this.loading.set(true);
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        this.handleSaveAction();
        break;
    }
  }

  protected handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: this.model()
    });
  }

  protected handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading.set(false);
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    panel?.classList.remove('dialog-enter-active');
    panel?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef?.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }


  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.organizationFullList.find(
  //     (entity) =>
  //       control.value === entity.name && this.dialogData.entity?.name !== entity.name
  //   )
  //     ? { duplicate: true }
  //     : null;
  // };
}
