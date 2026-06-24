import {Component, inject, input, OnDestroy, OnInit, output} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  MatSelectAutocompleteComponent
} from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestionnaire, DEFAULT_LANGUAGE, ISO_LANGUAGES} from '../../../../models/questionnaire';
import {Validator, ValidatorError} from '../../../../../../../../shared/utils/validators';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {merge, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {TextFormGroupComponent} from '../questionnaire-questions/text-form-group/text-form-group.component';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';

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
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  protected readonly ValidatorError = ValidatorError;

  questionnaires = input.required<AppQuestionnaire[] | null>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validator.requiredValidator, Validator.stringIdValidator],
      nonNullable: true
    }),
    defaultLanguage: new FormControl<RadarOption>(DEFAULT_LANGUAGE, {nonNullable: true}),
    title: new FormGroup({}),
    description: new FormGroup({}),
  });

  defaultLang: RadarOption = DEFAULT_LANGUAGE;
  languages: RadarOption[] = [DEFAULT_LANGUAGE];

  private subscription?: Subscription;

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
    this.form.controls.name.updateValueAndValidity();

    const entity = this.dialogState.selectedQuestionnaire();// this.entity();
    if (entity) {
      this.languages = entity.languages;
      this.defaultLang = entity.defaultLanguage;
      this.form.patchValue(entity);
      this.valid.emit(this.form.valid);
    }

    this.form.controls.defaultLanguage.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(language => {
        this.onDefaultLanguageChanged(language, entity);
    });

    merge(
      this.form.controls.name.valueChanges,
      this.form.controls.title.valueChanges,
      this.form.controls.description.valueChanges
    ).pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.onOtherFieldsChanged();
    });
  }

  onDefaultLanguageChanged(language: RadarOption, entity?: AppQuestionnaire) {
    this.defaultLang = language;
    if (entity) {
      const languages = [...entity.languages, this.defaultLang];
      this.languages = Array.from(
        new Set(languages.map(item => JSON.stringify(item)))
      ).map(item => JSON.parse(item));

      this.changeEvent.emit({defaultLanguage: language, languages: this.languages});
      this.valid.emit(this.form.valid);

      this.form.patchValue({...entity, defaultLanguage: language}, { emitEvent: false });
    } else {
      this.languages = [this.defaultLang];
      this.changeEvent.emit({defaultLanguage: language, languages: this.languages});
      this.valid.emit(this.form.valid);
    }
  }

  onOtherFieldsChanged() {
    this.changeEvent.emit({...this.form.getRawValue(), languages: this.languages});
    this.valid.emit(this.form.valid);
  }

  private duplicateValidator = (control: AbstractControl) => {
    return (this.questionnaires() ?? []).find(entity =>
      control.value === entity._name && this.dialogState.selectedQuestionnaire()?._name !== entity._name
    )
      ? {duplicate: true}
      : null;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
