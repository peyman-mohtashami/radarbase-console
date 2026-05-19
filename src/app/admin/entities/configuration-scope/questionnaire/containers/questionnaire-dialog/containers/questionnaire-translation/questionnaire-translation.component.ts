import {Component, input, output} from '@angular/core';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {FormControl, FormGroup} from '@angular/forms';
import {Validator} from '../../../../../../../../shared/utils/validators';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-questionnaire-translation',
  templateUrl: 'questionnaire-translation.component.html',
  imports: [
    JsonPipe
  ]
})
export class QuestionnaireTranslationComponent {
  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  // form = new FormGroup({
  //   name: new FormControl<string>('', {
  //     validators: [Validator.requiredValidator, Validator.stringIdValidator],
  //     nonNullable: true
  //   }),
  //   languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
  //   title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
  //   description: new FormControl<Record<string, string>>({}, {nonNullable: true}),
  //   estimatedCompletionTime: new FormControl<string>('', {nonNullable: true}),
  //   // onDemand: new FormControl<boolean>(false, {nonNullable: true}),
  //   // showInCalendar: new FormControl<boolean>(true, {nonNullable: true}),
  //   // isDemo: new FormControl<boolean>(false, {nonNullable: true}),
  //   // order: new FormControl<string>('', {nonNullable: true}),
  // });
  //
  // ngOnInit() {
  //   this.form.controls.name.addValidators(this.duplicateValidator);
  //   this.form.controls.name.updateValueAndValidity();
  //
  //   const entity = this.entity();
  //   if (entity) {
  //     this.form.patchValue(entity);
  //   }
  //
  //   this.valid.emit(this.form.valid);
  //
  //   this.form.valueChanges.subscribe(change => {
  //     this.changeEvent.emit(change);
  //     this.valid.emit(this.form.valid);
  //   });
  // }
}
