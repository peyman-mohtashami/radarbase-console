import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {AppQuestionnaire, ISO_LANGUAGES} from '../../../../models/questionnaire';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {form, FormField} from '@angular/forms/signals';
import {
  SearchableMultiSelectComponent
} from '../../../../../../../shared/components/searchable-multi-select/searchable-multi-select';
import {MatFormField, MatInput} from '@angular/material/input';

export interface QuestionnaireTranslationsLanguageForm {
  languages: string[];
}

export interface QuestionnaireTranslationsForm {
  title?: Record<string, string>
  description?: Record<string, string>
  startText?: Record<string, string>
  endText?: Record<string, string>
  warn?: Record<string, string>
  questions: QuestionnaireQuestionForm[]
  schedule?: {
    notification?: {
      title?: Record<string, string>
      text?: Record<string, string>
    }
  }
}

export interface QuestionnaireQuestionForm {
  field_label: Record<string, string>
  section_header?: Record<string, string>
  select_choices_or_calculations?: QuestionnaireQuestionChoiceForm[]
  field_note?: Record<string, string>
  range?: {
    labelLeft?: Record<string, string>
    labelRight?: Record<string, string>
  }
}

export interface QuestionnaireQuestionChoiceForm {
  label: Record<string, string>
}


@Component({
  selector: 'app-questionnaire-translation',
  templateUrl: 'questionnaire-translation.component.html',
  imports: [
    TranslatePipe,
    FormField,
    SearchableMultiSelectComponent,
    MatFormField,
    MatInput,
  ]
})
export class QuestionnaireTranslationComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  // numberOfGridRows = this.getNumberOfGridRows();

  protected languagesModel = signal<QuestionnaireTranslationsLanguageForm>({//this.dialogData.restoredModel ?? {
    languages: this.dialogState.questionnaire()?.languages.map(l => l.code) ?? [],
  });

  defaultLanguage = this.dialogState.questionnaire()!.defaultLanguage.code;

  readonly languagesList = computed(() => {
    const { languages } = this.languagesModel();
    return [
      this.defaultLanguage,
      ...languages.filter(lang => lang !== this.defaultLanguage),
    ];
  });

  protected model = signal<QuestionnaireTranslationsForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire()!,
  });

  protected languagesForm = form(this.languagesModel);

  protected form = form(this.model);

  // getNumberOfGridRows() {
  //   const questionnaire = this.dialogState.questionnaire()!;
  //   const lang = questionnaire.defaultLanguage.code;
  //   const numberOfQuestionnaireRows = 4 +
  //     (questionnaire.warningEnabled ? 1 : 0) +
  //     (questionnaire.schedule?.onDemand ? 0 : 2);
  //
  //   const numberOfQuestionsRows = (questionnaire.questions ?? []).reduce((acc, q) => {
  //     const numberOfQuestionRows = 2 + (q.field_note?.[lang] ? 1 : 0) + (q.section_header?.[lang] ? 1 : 0);
  //     const numberOfChoicesRows = q.select_choices_or_calculations?.length ?? 0;
  //     return acc + numberOfQuestionRows + numberOfChoicesRows;
  //   }, 0);
  //
  //   return numberOfQuestionnaireRows + numberOfQuestionsRows;
  // }


  constructor() {
    effect(() => {
      const languages = this.languagesModel().languages;

      this.model.update((value) => {
        return {
          title: languages.reduce((acc, lang) => ({...acc, [lang]: value.title?.[lang] ?? ''}), {} as Record<string, string>),
          description: languages.reduce((acc, lang) => ({...acc, [lang]: value.description?.[lang] ?? ''}), {} as Record<string, string>),
          startText: languages.reduce((acc, lang) => ({...acc, [lang]: value.startText?.[lang] ?? ''}), {} as Record<string, string>),
          endText: languages.reduce((acc, lang) => ({...acc, [lang]: value.endText?.[lang] ?? ''}), {} as Record<string, string>),
          warn: languages.reduce((acc, lang) => ({...acc, [lang]: value.warn?.[lang] ?? ''}), {} as Record<string, string>),
          questions: value.questions?.map(q => {
            return {
              field_label: languages.reduce((acc, lang) => ({...acc, [lang]: q.field_label?.[lang] ?? ''}), {} as Record<string, string>),
              section_header: languages.reduce((acc, lang) => ({...acc, [lang]: q.section_header?.[lang] ?? ''}), {} as Record<string, string>),
              select_choices_or_calculations: q.select_choices_or_calculations?.map(c => {
                return {
                  label: languages.reduce((acc, lang) => ({...acc, [lang]: c.label?.[lang] ?? ''}), {} as Record<string, string>),
                }
              }) ?? [],
              field_note: languages.reduce((acc, lang) => ({...acc, [lang]: q.field_note?.[lang] ?? ''}), {} as Record<string, string>),
              range: {
                labelLeft: languages.reduce((acc, lang) => ({...acc, [lang]: q.range?.labelLeft?.[lang] ?? ''}), {} as Record<string, string>),
                labelRight: languages.reduce((acc, lang) => ({...acc, [lang]: q.range?.labelRight?.[lang] ?? ''}), {} as Record<string, string>),
              }
            }
          }) ?? [],
          schedule: {
            notification: {
              title: languages.reduce((acc, lang) => ({...acc, [lang]: value.schedule?.notification?.title?.[lang] ?? ''}), {} as Record<string, string>),
              text: languages.reduce((acc, lang) => ({...acc, [lang]: value.schedule?.notification?.text?.[lang] ?? ''}), {} as Record<string, string>),
            }
          }
        }
      })
    });
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.dialogState.questionnaire());

      const updated = {
        ...entity,
        ...model,
        schedule: {
          ...entity?.schedule,
          notification: {
            ...entity?.schedule?.notification,
            title: model.schedule?.notification?.title,
            text: model.schedule?.notification?.text,
          }
        }
      } as AppQuestionnaire;

      this.dialogState.questionnaire.set(updated);
    });
  }
}
