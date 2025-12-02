import {AfterViewInit, Component, effect, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {AppClient} from "../../models/client";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput, MatSuffix} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {SourceTypeConfigService} from '../../../source-type/services/source-type-config.service';
import {DialogMode} from '../../../../enums/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    TranslatePipe,
    ReactiveFormsModule,
    DialogActionsComponent,
    MatCheckbox,
    MatFormField,
    MatError,
    MatInput,
    DhmsPipe,
    MatHint,
    MatSlideToggle,
    MatButton,
    MatSuffix
  ]
})
export class ClientDialogComponent implements OnInit, AfterViewInit {

  protected configService = inject(SourceTypeConfigService);
  private dialogRef = inject(MatDialogRef<ClientDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppClient;
    entities: AppClient[];
  };

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    clientId: new FormControl<string>({value: '', disabled: this.dialogData.mode !== DialogMode.ADD}, {nonNullable: true, validators: [Validator.requiredValidator, Validator.stringIdValidator]}),
    enableEmptySecret: new FormControl<boolean>(false),
    clientSecret: new FormControl<string>(''),
    scope: new FormControl<string[]>([], {validators: [Validator.requiredValidator]}),
    resourceIds: new FormControl<string[]>([], {nonNullable: true, validators: [Validator.requiredValidator]}),
    _authorizedGrantTypes: new FormGroup({
        refresh_token: new FormControl<boolean>(false),
        password: new FormControl<boolean>(false),
        authorization_code: new FormControl<boolean>(false),
        client_credentials: new FormControl<boolean>(false),
        implicit: new FormControl<boolean>(false),
      },
    ),
    registeredRedirectUri: new FormControl<string[]>([]),
    autoApproveScopes: new FormControl<string[]>([]),
    accessTokenValiditySeconds: new FormControl<number | null>(null, {validators: [Validator.requiredValidator]}),
    refreshTokenValiditySeconds: new FormControl<number | null>(null, {validators: [Validator.requiredValidator]}),
    additionalInformation: new FormGroup({
      dynamic_registration: new FormControl<boolean>(false),
    })
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppClient }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error.set(null);
      }
    });
  }

  ngOnInit() {
    this.form.controls.clientId.addValidators(this.duplicateValidator);
    this.form.patchValue(this.dialogData.entity);
    this.form.controls.enableEmptySecret?.valueChanges.subscribe((value) => {
      this.form.controls.clientSecret?.setValidators(
        value ? null : Validator.requiredValidator
      );
      this.form.controls.clientSecret?.updateValueAndValidity();
    });
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: string) { //TODO DIALOG_ACTION
    this.error.set(null);
    this.loading.set(true);
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.handleDeleteAction();
        break;
      case 'save':
        this.handleSaveAction();
        break;
    }
  }

  private handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value, enableEmptySecret: null},
    });
  }

  private handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }

  generateRandomSecret(length: number) {
    const text = [];
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    this.form?.patchValue({
      clientSecret: text.join(''),
    });
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.dialogData.entities?.find(
      (entity) =>
        control.value === entity.clientId &&
        this.dialogData.entity?.clientId !== entity.clientId
    )
      ? { duplicate: true }
      : null;
  };
}

// export function NotEmptyCheckValidator(): ValidatorFn {
//   return (control: AbstractControl) => {
//     const formGroup = control as FormGroup;
//     let errorFlag = true;
//     Object.keys(formGroup.controls).forEach((key) => {
//       if (formGroup.get(key)?.value) {
//         errorFlag = false;
//       }
//     });
//     if (errorFlag) {
//       formGroup.setErrors({ required: true });
//       return {required: true}
//     }
//     return null;
//   };
// }
