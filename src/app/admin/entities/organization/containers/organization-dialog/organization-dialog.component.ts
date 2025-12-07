import {AfterViewInit, Component, effect, inject, OnInit, output, signal} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import { AppOrganization } from "../../models/organization";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../components/dialog/dialog-actions/dialog-actions.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
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
  ]
})
export class OrganizationDialogComponent extends BaseDialogComponent<AppOrganization> implements OnInit, AfterViewInit {
  override configService = inject(OrganizationConfigService);
  override dialogRef = inject(MatDialogRef<OrganizationDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppOrganization;
    entities: AppOrganization[];
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    id: new FormControl<string | number>({value: "", disabled: true}, {nonNullable: true}),
    name: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    description: new FormControl<string>("", {validators: [Validator.longTextValidator]}),
    location: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
  });

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
    super.init();
    this.form.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.value},
    });
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  // close() {
  //   this.loading.set(false);
  //   const container = document.querySelector('.tailwind-slide-panel');
  //   container?.classList.remove('dialog-enter-active');
  //   container?.classList.add('dialog-exit-active');
  //
  //   setTimeout(() => {
  //     this.dialogActionEvent.emit({action: DialogMode.CLOSE});
  //     this.dialogRef.close();
  //   }, 300);
  // }
  //
  // errorHappened(error: HttpErrorResponse): void {
  //   this.loading.set(false);
  //   this.error.set(error);
  // }

  private duplicateValidator = (control: AbstractControl) => {
    return this.dialogData.entities?.find(
      (entity) =>
        control.value === entity.name && this.dialogData.entity?.name !== entity.name
    )
      ? { duplicate: true }
      : null;
  };
}

// export class OrganizationDialogComponent implements OnInit, AfterViewInit {
//   protected configService = inject(OrganizationConfigService);
//   private dialogRef = inject(MatDialogRef<OrganizationDialogComponent>);
//   protected dialogData = inject(MAT_DIALOG_DATA) as {
//     mode: DialogMode;
//     entity: AppOrganization;
//     entities: AppOrganization[];
//   };
//
//   protected readonly DialogMode = DialogMode;
//   protected readonly ValidatorHint = ValidatorHint;
//   protected readonly ValidatorError = ValidatorError;
//
//   formFields = this.configService.getFormFields();
//
//   form = new FormGroup({
//     id: new FormControl<string | number>({value: "", disabled: true}, {nonNullable: true}),
//     name: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
//     description: new FormControl<string>("", {validators: [Validator.longTextValidator]}),
//     location: new FormControl<string>("", {validators: [Validator.normalTextValidator]}),
//   });
//
//   loading = signal(false);
//   error = signal<HttpErrorResponse | null>(null);
//
//   dialogActionEvent = output<{ action: DialogMode, entity?: AppOrganization }>();
//
//   private readonly formValueChanges = toSignal(
//     this.form.valueChanges.pipe(debounceTime(300)),
//     {initialValue: this.form.getRawValue()}
//   );
//
//   constructor() {
//     effect(() => {
//       if (this.formValueChanges()) {
//         this.error.set(null);
//       }
//     });
//   }
//
//   ngOnInit() {
//     this.form.controls.name.addValidators(this.duplicateValidator);
//     this.form.patchValue(this.dialogData.entity);
//   }
//
//   ngAfterViewInit() {
//     const dialogContainer = document.querySelector('.tailwind-slide-panel');
//     setTimeout(() => {
//       dialogContainer?.classList.add('dialog-enter-active');
//     });
//   }
//
//   onAction($event: DialogAction) {
//     this.error.set(null);
//     this.loading.set(true);
//     switch ($event) {
//       case DialogAction.CLOSE:
//         this.close();
//         break;
//         case DialogAction.DELETE:
//         this.handleDeleteAction();
//         break;
//       case DialogAction.SAVE:
//         this.handleSaveAction();
//         break;
//     }
//   }
//
//   private handleSaveAction(): void {
//     this.dialogActionEvent.emit({
//       action: this.dialogData.mode,
//       entity: {...this.dialogData.entity, ...this.form.value},
//     });
//   }
//
//   private handleDeleteAction(): void {
//     this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
//   }
//
//   close() {
//     this.loading.set(false);
//     const container = document.querySelector('.tailwind-slide-panel');
//     container?.classList.remove('dialog-enter-active');
//     container?.classList.add('dialog-exit-active');
//
//     setTimeout(() => {
//       this.dialogActionEvent.emit({action: DialogMode.CLOSE});
//       this.dialogRef.close();
//     }, 300);
//   }
//
//   errorHappened(error: HttpErrorResponse): void {
//     this.loading.set(false);
//     this.error.set(error);
//   }
//
//   private duplicateValidator = (control: AbstractControl) => {
//     return this.dialogData.entities?.find(
//       (entity) =>
//         control.value === entity.name && this.dialogData.entity?.name !== entity.name
//     )
//       ? { duplicate: true }
//       : null;
//   };
// }
