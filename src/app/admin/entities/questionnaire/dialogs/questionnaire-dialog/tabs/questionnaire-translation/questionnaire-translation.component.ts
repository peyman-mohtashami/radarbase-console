import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {AppQuestionnaire, QuestionType} from '../../../../models/questionnaire';
import {applyEach, form, FormField} from '@angular/forms/signals';
import {MatFormField, MatInput} from '@angular/material/input';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {requiredField, RequiredWhen} from '../../../../../../../shared/utils/signal-form-validators';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';


@Component({
  selector: 'app-questionnaire-translation',
  templateUrl: 'questionnaire-translation.component.html',
  imports: [
    FormField,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    TranslatePipe,
  ]
})
export class QuestionnaireTranslationComponent {
  protected store = inject(QuestionnaireStore);

  defaultLanguage = this.store.selected()!.defaultLanguage;

  readonly languagesList = computed(() => {
    const languages = this.store.selected()!.languages;
    return [
      this.defaultLanguage,
      ...languages.filter(lang => lang.code !== this.defaultLanguage.code),
    ];
  });

  _questionnaire = this.store.selected()!;

  protected model = signal<AppQuestionnaire>({//this.dialogData.restoredModel ?? {
    ...this._questionnaire,
    title: this.withLanguages(this._questionnaire.title),
    description: this.withLanguages(this._questionnaire.description),
    startText: this.withLanguages(this._questionnaire.startText),
    endText: this.withLanguages(this._questionnaire.endText)!,
    warn: this.withLanguages(this._questionnaire.warn),
    questions: this._questionnaire.questions.map(q => {
      return {
        ...q,
        field_label: this.withLanguages(q.field_label)!,
        section_header: this.withLanguages(q.section_header),
        field_note: this.withLanguages(q.field_note),
        select_choices_or_calculations: q.select_choices_or_calculations?.map(c => {
          return {
            ...c,
            label: this.withLanguages(c.label)!,
          }
        }),
        range: q.range ? {
          ...q.range,
          labelLeft: this.withLanguages(q.range?.labelLeft),
          labelRight: this.withLanguages(q.range?.labelRight),
        } : undefined
      }
    }),
    schedule: {
      ...this._questionnaire.schedule,
      notification: {
        title: this.withLanguages(this._questionnaire.schedule?.notification?.title),
        text: this.withLanguages(this._questionnaire.schedule?.notification?.text),
      }
    }
  });

  withLanguages(value: Record<string, string> | undefined) {
    if (!value) return undefined;
    return this._questionnaire.languages.reduce((acc, lang) => ({...acc, [lang.code]: value?.[lang.code] ?? ''}), {} as Record<string, string>);
  }

  protected form = form(this.model, (schema) => {
    applyEach(schema.questions, (question) => {
      this._questionnaire.languages.forEach(l => {
        requiredField(question.field_label[l.code]);
      })

      if (question.section_header) {
        this._questionnaire.languages.forEach(l => {
          requiredField(question.section_header![l.code]);
        })
      }

      if (question.field_note) {
        this._questionnaire.languages.forEach(l => {
          requiredField(question.field_note![l.code]);
        })
      }

      if (question.select_choices_or_calculations) {
        applyEach(question.select_choices_or_calculations, (choice) => {
          const whenRequired: RequiredWhen = ({valueOf}) => [QuestionType.INFO, QuestionType.CHECKBOX, QuestionType.RADIO, QuestionType.RANGE].includes(valueOf(question.field_type) as QuestionType);
          requiredField(choice.code, {when: whenRequired});
          this._questionnaire.languages.forEach(l => {
            requiredField(choice.label[l.code], {when: whenRequired});
          })
        });
      }

      if (question.range?.labelLeft) {
        this._questionnaire.languages.forEach(l => {
          requiredField(question.range!.labelLeft![l.code]);
        })
      }

      if (question.range?.labelRight) {
        this._questionnaire.languages.forEach(l => {
          requiredField(question.range!.labelRight![l.code]);
        })
      }
    });
  });

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.store.selected());
      const updated = {
        ...entity,
        ...model,
        isTranslationsTabValid: this.form().valid()
      } as AppQuestionnaire;

      this.store.selected.set(updated);
    });
  }
}
