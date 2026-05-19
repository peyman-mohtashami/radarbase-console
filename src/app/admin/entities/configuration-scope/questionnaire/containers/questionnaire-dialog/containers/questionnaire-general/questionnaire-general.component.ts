import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  MatSelectAutocompleteComponent
} from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';
import {AppQuestionnaire, DEFAULT_LANGUAGE, ISO_LANGUAGES} from '../../../../models/questionnaire';
import {Validator, ValidatorError} from '../../../../../../../../shared/utils/validators';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-questionnaire-general',
  templateUrl: 'questionnaire-general.component.html',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatSelectAutocompleteComponent,
    ReactiveFormsModule,
    TranslatePipe,
    TextFormGroupComponent,
  ]
})
export class QuestionnaireGeneralComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_LANG = DEFAULT_LANGUAGE;
  protected readonly ValidatorError = ValidatorError;
  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  questionnaires = input.required<AppQuestionnaire[] | null>();
  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validator.requiredValidator, Validator.stringIdValidator],
      nonNullable: true
    }),
    languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
    title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    description: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    estimatedCompletionTime: new FormControl<string>('', {nonNullable: true}),
    // showInCalendar: new FormControl<boolean>(true, {nonNullable: true}),
    // isDemo: new FormControl<boolean>(false, {nonNullable: true}),
    // order: new FormControl<string>('', {nonNullable: true}),
  });

  private subscription?: Subscription;

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
    this.form.controls.name.updateValueAndValidity();

    const entity = this.entity();
    if (entity) {
      this.form.patchValue(entity);
    }

    this.valid.emit(this.form.valid);

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.changeEvent.emit(change);
      this.valid.emit(this.form.valid);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private duplicateValidator = (control: AbstractControl) => {
    return (this.questionnaires() ?? []).find(entity =>
      control.value === entity._name && this.entity()?._name !== entity._name
    )
      ? {duplicate: true}
      : null;
  }
}
