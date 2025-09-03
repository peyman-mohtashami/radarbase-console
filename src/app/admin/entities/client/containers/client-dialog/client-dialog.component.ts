import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppClient } from "../../models/client";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {ClientDetailsComponent} from "../../components/client-details/client-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {DhmsPipe} from "../../../../pipes/dhms.pipe";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatDynamicInputComponent} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {FIELDS} from '../../../source-data/config';

@Component({
  selector: 'rb-client-dialog',
  templateUrl: './client-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ClientDetailsComponent,
    TranslatePipe,
    ReactiveFormsModule,
    // MatFormField,
    // MatLabel,
    // MatFormField,
    // MatInput,
    // MatError,
    // MatSlideToggle,
    // MatLabel,
    // MatFormField,
    // MatButton,
    // MatCheckbox,
    // DhmsPipe,
    ErrorMessageComponent,
    DialogActionsComponent,
    // MatHint,
    // NgIf,
    AsyncPipe,
    MatDynamicInputComponent,
    JsonPipe
  ]
})
export class ClientDialogComponent
  extends BaseDialogComponent<AppClient, ClientDialogComponent>
  implements OnInit
{
  override name = ENTITY_NAME.client;
  override form = new FormGroup({});
  //
  //
  // override form = new FormGroup({
  //   clientId: new FormControl({value: undefined, disabled: !!this.entity}, [Validator.requiredValidator, Validator.normalTextValidator]),
  //   enableEmptySecret: new FormControl<boolean | null>(false),
  //   clientSecret: new FormControl<string | null>(null, [Validator.requiredValidator]),
  //   scope: new FormControl<string | null>(null, [Validator.requiredValidator]),
  //   resourceIds: new FormControl<string | null>(null, [Validator.requiredValidator]),
  //   formAuthorizedGrantTypes: new FormGroup({
  //       refresh_token: new FormControl(true),
  //       password: new FormControl(false),
  //       authorization_code: new FormControl(true),
  //       client_credentials: new FormControl(false),
  //       implicit: new FormControl(false),
  //     },
  //     //   {
  //     //   validators: [NotEmptyCheckValidator()],
  //     // }
  //   ),
  //   registeredRedirectUri: new FormControl<string | null>(null),
  //   autoApproveScopes: new FormControl<string | null>(null),
  //   accessTokenValiditySeconds: new FormControl(0, {validators: [Validator.requiredValidator], nonNullable: true}),
  //   refreshTokenValiditySeconds: new FormControl(0, {validators: [Validator.requiredValidator], nonNullable: true}),
  //   additionalInformation: new FormGroup({
  //     dynamic_registration: new FormControl(false),
  //   }),
  // });
  _fields?: any[];

  // entities; // = this.data.entities;

  // enableEmptySecret = false;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppClient;
      extra: any;
      // entities: AppClient[];
    }
  ) {
    super(router, dialogRef, data);
    // this.entities = this.data.entities;
  }

  override ngOnInit() {
    console.log('Class: SourceDataDialogComponent, Function: ngOnInit, Line 99 this.data' , this.data);
    this.config$?.subscribe(config => {
      console.log('Class: ProjectDialogComponent, Function: , Line 146 config', config);
      const generatedFields = FIELDS.map((field: any) => {
        if (!field.nonEditable) {
          const c = config?.['fields']?.find((f: any) => f.name === field.name);
          if (c) {
            if (c.enabled) {
              return {...field, ...c};
            } else {
              // not added
            }
          } else {
            return field;
          }
        } else {
          return field;
        }
      }).filter((field: any) => field !== undefined);
      const extraFields: any[] = config?.['extraFields']?.map((field: any) => {
        const clonedField = {...field}; // Clone the object
        clonedField['extra'] = true; // Safely add the property
        return clonedField;
      }) ?? [];
      this._fields = [...generatedFields, ...extraFields];
      console.log('Class: ProjectDialogComponent, Function: , Line 134 ', this._fields);

      this._fields.forEach((field: any) => {
        console.log('Class: SubjectDialogComponent, Function: 111, Line 147 field', field);
        if (field.extra) {
          console.log('Class: SubjectDialogComponent, Function: 111, Line 149 ',);
          const attr = this.entity['attribute'] as any;
          if (attr) {
            // this.form.addControl(field.name, new FormControl<string | null>({value: this.entity?.['attributes']?.[field.name]?.toString() ?? null, disabled: field.auto}));
            this.form.addControl(field.name, new FormControl<string | null>({
              value: attr?.[field.name]?.toString() ?? null,
              disabled: field.auto
            }));
          }
        } else {
          if (field.name.startsWith('attributes.')) {
            console.log('Class: SubjectDialogComponent, Function: , Line 153 ',);
            const _key = field.name.split('.')[1];
            console.log('Class: SubjectDialogComponent, Function: , Line 155 _key', _key);
            const attr = this.entity['attributes'] as any;
            if (attr) {
              // this.form.addControl(field.name, new FormControl<string | null>({
              //   value: this.entity?.attributes?.[_key]?.toString() ?? null,
              //   disabled: field.auto
              // }));
              this.form.addControl(field.name, new FormControl<string | null>({
                value: attr?.[_key]?.toString() ?? null,
                disabled: field.auto
              }));
            }
          } else {
            this.form.addControl(field.name, new FormControl<string | null>(
              {
                value: this.entity?.[field.name]?.toString() ?? null,
                disabled: field.auto,
              },
              // [Validators.required]
            ));
          }
        }

      })
    })
    super.ngOnInit();
  }


  // override ngOnInit() {
  //   super.ngOnInit();
  //   this.form.controls.clientId?.addValidators(this.duplicateValidator);
  //
  //   this.form.controls.enableEmptySecret?.valueChanges.subscribe((value) => {
  //     this.form.controls.clientSecret?.setValidators(
  //       value ? null : Validator.requiredValidator
  //     );
  //     this.form.controls.clientSecret?.updateValueAndValidity();
  //   });
  // }

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

  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.entities?.find(
  //     (entity) =>
  //       control.value === entity.clientId &&
  //       this.entity?.clientId !== entity.clientId
  //   )
  //     ? { duplicate: true }
  //     : null;
  // };
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
