import {Injectable, signal} from "@angular/core";
import {AnswerWithTimeLog} from '../models/kafka';
import {AppQuestionnaireLanguage, DEFAULT_LANGUAGE} from '../../../../../models/questionnaire';
import {VariablesInputForm} from '../components/preview-placeholder-form/preview-placeholder-form.component';

const PreviewTranslations: Record<string, Record<string, string>> = {
  close: {en: 'Close', nl: "CloseNL"},
  previous: {en: 'Previous', nl: "PreviousNL"},
  next: {en: 'Next', nl: "NextNL"},
  finish: {en: 'Finish', nl: "FinishNL"},
  clear: {en: 'Clear', nl: "ClearNL"},
  previewNotAvailable: {en: 'Audio recorder - Preview is not available'},
  numberBetween: {en: 'Enter a number between'},
  numberGreaterThan: {en: 'Enter a number greater than'},
  numberLessThan: {en: 'Enter a number less than'},
  timeBetween: {en: 'Enter a time between'},
  timeGreaterThan: {en: 'Enter a time after'},
  timeLessThan: {en: 'Enter a time before'},
  start: {en: 'Start', nl: 'StartNL'},
  done: {en: 'Done', nl: 'DoneNL'},
  VALIDATION_ERROR: {en: 'Invalid value', nl: 'Invalid value'},
  optional: {en: 'Optional', nl: 'Optional'},
}

@Injectable({providedIn: 'root'})
export class PreviewStore {
  answers = signal<Record<string, AnswerWithTimeLog[]>>({});
  language = signal<AppQuestionnaireLanguage>(DEFAULT_LANGUAGE);
  variables = signal<VariablesInputForm>([]);

  translate(key: string) {
    return PreviewTranslations[key]?.[this.language().code] ?? PreviewTranslations[key]?.[DEFAULT_LANGUAGE.code];
  }
}



