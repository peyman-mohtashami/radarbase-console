import {Component, computed, effect, inject, output, signal} from '@angular/core';
import {
  AppQuestion,
  AppQuestionnaire,
  ISO_LANGUAGES
} from '../../../../models/questionnaire';
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
  translation: Record<string, QuestionnaireTranslationForm>;
}


export interface QuestionnaireTranslationForm {
  title: string;
  description: string;
  endText: string;
  warn: string;
  schedule: {
    notification: {
      title: string;
      text: string;
    }
  };
  questions: QuestionnaireQuestionForm[];
}

export interface QuestionnaireQuestionForm {
  field_name: string;
  field_label: string;
  field_note: string;
  section_header: string;
  select_choices_or_calculations: {code: string; label: string;}[];
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

  valid = output<boolean>();

  numberOfGridRows = this.getNumberOfGridRows();

  protected languagesModel = signal<QuestionnaireTranslationsLanguageForm>({//this.dialogData.restoredModel ?? {
    languages: this.dialogState.questionnaire()?.languages.map(l => l.code) ?? [],
  });

  readonly languagesList = computed(() => {
    const { languages } = this.languagesModel();
    const defaultLanguage = this.dialogState.questionnaire()!.defaultLanguage.code;

    return [
      defaultLanguage,
      ...languages.filter(lang => lang !== defaultLanguage),
    ];
  });

  protected model = signal<QuestionnaireTranslationsForm>({//this.dialogData.restoredModel ?? {
    translation: this.getTranslations(this.dialogState.questionnaire()!, this.dialogState.questionnaire()?.languages.map(l => l.code) ?? [])
  });

  getTranslations(questionnaire: AppQuestionnaire, languages: string[]):  Record<string, QuestionnaireTranslationForm> {
    return languages.reduce((acc: Record<string, QuestionnaireTranslationForm>, language) => {
      acc[language] = this.getTranslationForm(questionnaire, language);
      return acc;
    }, {});
  }

  getTranslationForm(questionnaire: AppQuestionnaire, language: string) {
    return {
      title: questionnaire.title?.[language] ?? '',
      description: questionnaire.description?.[language] ?? '',
      endText: questionnaire.endText?.[language] ?? '',
      warn: questionnaire.warn?.[language] ?? '',
      schedule: {
        notification: {
          title: questionnaire.title?.[language] ?? '',
          text: questionnaire.description?.[language] ?? '',
        }
      },
      questions: this.getQuestionnaireQuestionForm(questionnaire.questions, language)
    }
  }

  getQuestionnaireQuestionForm(questions: AppQuestion[], language: string): QuestionnaireQuestionForm[] {
    return questions.map(q => {
      return {
        field_name: q.field_name,
        field_label: q.field_label[language] ?? '',
        field_note: q.field_note?.[language] ?? '',
        section_header: q.section_header?.[language] ?? '',
        select_choices_or_calculations: q.select_choices_or_calculations?.map(c => {
          return {
            code: c.code,
            label: c.label[language] ?? '',
          }
        }) ?? [],
      }
    })
  }

  protected languagesForm = form(this.languagesModel, (schema) => {
  });

  protected form = form(this.model, (schema) => {
  });

  getNumberOfGridRows() {
    const questionnaire = this.dialogState.questionnaire()!;
    const lang = questionnaire.defaultLanguage.code;
    const numberOfQuestionnaireRows = 4 +
      (questionnaire.warningEnabled ? 1 : 0) +
      (questionnaire.schedule?.onDemand ? 0 : 2);

    const numberOfQuestionsRows = questionnaire.questions.reduce((acc, q) => {
      const numberOfQuestionRows = 2 + (q.field_note?.[lang] ? 1 : 0) + (q.section_header?.[lang] ? 1 : 0);
      const numberOfChoicesRows = q.select_choices_or_calculations?.length ?? 0;
      return acc + numberOfQuestionRows + numberOfChoicesRows;
    }, 0);

    console.log('Class: QuestionnaireTranslationComponent, Function: getNumberOfGridRows, Line 142 numberOfQuestionnaireRows, numberOfQuestionsRows' , numberOfQuestionnaireRows, numberOfQuestionsRows);

    return numberOfQuestionnaireRows + numberOfQuestionsRows;
  }


  constructor() {
    effect(() => {
      const languages = this.languagesModel().languages;
      this.model.update(value => {
        return {
          translation: this.getTranslations(this.dialogState.questionnaire()!, languages)
        }
      })
    });
    // effect(() => {
    //   const model = this.model();
    //   const entity = untracked(() => this.dialogState.questionnaire());
    //   const updated = {
    //     ...entity,
    //     ...model.translation
    //   } as AppQuestionnaire;
    //   this.dialogState.questionnaire.set(updated);
    //   this.valid.emit(this.form().valid());
    // });
  }
}
