import {Injectable, signal} from "@angular/core";
import {AnswerWithTimeLog} from '../models/kafka';
import {AppQuestionnaireLanguage, DEFAULT_LANGUAGE} from '../../../../../models/questionnaire';

const PreviewTranslations: Record<string, any> = {
  close: {en: 'Close', nl: "CloseNL"},
  previous: {en: 'Previous', nl: "PreviousNL"},
  next: {en: 'Next', nl: "NextNL"},
  finish: {en: 'Finish', nl: "FinishNL"},
  clear: {en: 'Clear', nl: "ClearNL"},
}

@Injectable({providedIn: 'root'})
export class PreviewStore {
  answers = signal<Record<string, AnswerWithTimeLog[]>>({});
  language = signal<AppQuestionnaireLanguage>(DEFAULT_LANGUAGE);
  placeholderAnswers = signal<Partial<{
    placeholders: Partial<{
      questionnaireId: string
      questionId: string
      operator: string
      startTimestamp: string
      endTimestamp: string
      value: string
    }>[]
  }>>({placeholders: []});
  // placeholderAnswers = signal<{
  //     questionnaireId: string
  //     questionId: string
  //     operator: string
  //     startTimestamp: string
  //     endTimestamp: string
  //     value: string
  //   }[]
  // >([]);
  translate(key: string) {
    return PreviewTranslations[key]?.[this.language().code] ?? PreviewTranslations[key]?.[DEFAULT_LANGUAGE.code];
  }
}



