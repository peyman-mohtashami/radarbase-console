import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  MatSelectAutocompleteComponent
} from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
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
  ]
})
export class QuestionnaireGeneralComponent implements OnInit, OnDestroy {
  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  protected readonly ValidatorError = ValidatorError;

  questionnaires = input.required<AppQuestionnaire[] | null>();
  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validator.requiredValidator, Validator.stringIdValidator],
      nonNullable: true
    }),
    defaultLanguage: new FormControl<RadarOption>(DEFAULT_LANGUAGE, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    description: new FormControl<string>('', {nonNullable: true}),
  });

  defaultLang: RadarOption = DEFAULT_LANGUAGE;
  languages: RadarOption[] = [DEFAULT_LANGUAGE];

  private subscription?: Subscription;

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
    this.form.controls.name.updateValueAndValidity();

    const entity = this.entity();
    if (entity) {
      this.defaultLang = entity.defaultLanguage;
      const formEntity = this.getFormEntity(entity, this.defaultLang);
      this.form.patchValue(formEntity);
      this.valid.emit(this.form.valid);
    }

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      if (change.defaultLanguage && change.defaultLanguage.id !== this.defaultLang.id) {
        this.defaultLang = change.defaultLanguage;
        if (entity) {
          const languages = [...entity.languages, this.defaultLang];
          this.languages = Array.from(
            new Set(languages.map(item => JSON.stringify(item)))
          ).map(item => JSON.parse(item));

          const updated = this.getUpdatedEntity(entity, change);
          this.changeEvent.emit(updated);
          this.valid.emit(this.form.valid);

          const newFormEntity = this.getFormEntity(entity, this.defaultLang);
          this.form.patchValue(newFormEntity);
        } else {
          this.languages = [this.defaultLang];
          const updated = this.getUpdatedEntity(undefined, change);
          this.changeEvent.emit(updated);
          this.valid.emit(this.form.valid);
        }
      } else {
        const updated = this.getUpdatedEntity(entity, change);
        this.changeEvent.emit(updated);
        this.valid.emit(this.form.valid);
      }
    });
  }

  getFormEntity(entity: AppQuestionnaire, language: RadarOption) {
    return {...entity, defaultLanguage: this.defaultLang, title: entity.title?.[language.id], description: entity.description?.[language.id]};
  }

  getUpdatedEntity(originalEntity: AppQuestionnaire | undefined, formEntity: any): AppQuestionnaire {
    return {
      ...originalEntity,
      ...formEntity,
      title: {...originalEntity?.title, [this.defaultLang.id]: formEntity.title ?? ''},
      description: {...originalEntity?.description, [this.defaultLang.id]: formEntity.description ?? ''},
      languages: this.languages,
    }
  }

  private duplicateValidator = (control: AbstractControl) => {
    return (this.questionnaires() ?? []).find(entity =>
      control.value === entity._name && this.entity()?._name !== entity._name
    )
      ? {duplicate: true}
      : null;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
