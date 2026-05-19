import {Component, input, OnInit, output} from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, NG_VALIDATORS, AbstractControl,
} from '@angular/forms';
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {Choice} from "../choices-form-array/choices-form-array.component";
import {Validator as CustomValidator} from "../../../../../../../../../shared/utils/validators";
// import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";
import {MatIcon} from '@angular/material/icon';
// import {
//   BaseFormGroupComponent
// } from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {
  BaseFormGroupComponent
} from '../../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';

export interface ChoiceForm {
  code: FormControl<string>
  label: FormControl<Record<string, string>>
}

@Component({
  selector: 'app-choice-form-group',
  templateUrl: './choice-form-group.component.html',
  imports: [
    MatIconButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    TextFormGroupComponent,
    MatIcon,
    CdkDrag,
    MatError,
    TranslatePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ChoiceFormGroupComponent
    }, {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ChoiceFormGroupComponent
    }
  ]
})
export class ChoiceFormGroupComponent extends BaseFormGroupComponent<Choice> implements OnInit {

  languages = input.required<RadarOption[]>();
  questionIndex = input.required<number>();
  remove = output<void>();

  form = new FormGroup<Partial<ChoiceForm>>({
    code: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    label: new FormControl<Record<string, string>>({}, {nonNullable: true}),
  });

  choiceFullList = input<(Choice | undefined)[]>([]);

  constructor() {
    super();

    this.form.statusChanges.subscribe(() => {
      this.validatorChange();
    });
  }

  ngOnInit(): void {
    this.form.controls.code?.addValidators(this.duplicateValidator);

  }

  override writeValue(question: Choice) {
    super.writeValue(question);
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.choiceFullList().find(choice=> control.value === choice?.code)
      ? { duplicate: true }
      : null;
  };
}
