import {Component} from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, NG_VALIDATORS
} from '@angular/forms';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
import {TranslatePipe} from "@ngx-translate/core";
import {
  BaseFormGroupComponent
} from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';

@Component({
  selector: 'app-annotation-form-group',
  templateUrl: './annotation-form-group.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    TranslatePipe,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AnnotationFormGroupComponent
  },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AnnotationFormGroupComponent
    }]
})
export class AnnotationFormGroupComponent extends BaseFormGroupComponent<{image: string; timer: {start: number; end: number;}; unit: string;} | null> {

  form = new FormGroup({
    image: new FormControl<string | null>(null, {validators: [CustomValidator.requiredValidator]}),
    timer: new FormGroup({
      start: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
      end: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
    }),
    unit: new FormControl<string | null>(null, {validators: [CustomValidator.requiredValidator]})
  });
}


