import {
  QuestionTemplateVariable
} from '../dialogs/questionnaire-dialog/tabs/questionnaire-variables/model/template-field.model';

export interface AppQuestionnaire {
  id: string;
  version: string;
  //---
  name: string;
  modelVersion: string;
  languages: AppQuestionnaireLanguage[];
  defaultLanguage: AppQuestionnaireLanguage;
  onDemand: boolean;
  showInCalendar?: boolean;
  estimatedCompletionTime?: string;
  isDemo?: boolean;
  order?: string;
  //---
  title?: Record<string, string>;
  description?: Record<string, string>;
  showIntroduction?: string;
  startText?: Record<string, string>;
  endText: Record<string, string>;
  warningEnabled?: boolean;
  warn?: Record<string, string>;
  //---
  questions: AppQuestion[];
  //---
  schedule?: AppQuestionnaireSchedule;
  //---
  isGeneralTabValid?: boolean;
  isSchedulingTabValid?: boolean;
  isCustomMessagesTabValid?: boolean;
  isNotificationsTabValid?: boolean;
  isQuestionsTabValid?: boolean;
  isTranslationsTabValid?: boolean;
  //---
  variables?: QuestionTemplateVariable[];
  //---
  isActive?: boolean;
  isValid?: boolean;
  //---
  search: string;
}

export interface AppQuestionnaireSchedule {
  relativeToReferenceTime?: boolean;
  referenceTimestamp?: string;
  repeatedProtocol?: boolean;
  repeatProtocol?: AppScheduleRepeat;
  repeatQuestionnaire?: AppScheduleRepeatQuestionnaire;
  completionWindow?: AppScheduleDuration;
  notification?: AppScheduleNotification;
  reminders?: AppScheduleReminder
}

export interface AppScheduleRepeat {
  unit: string; amount: string;
}

export interface AppScheduleRepeatQuestionnaire {
  unit?: string; unitsFromZero?: string[];
}

export interface AppScheduleDuration {
  unit: string; amount: string
}

export interface AppScheduleNotification {
  title?: Record<string, string>;
  text?: Record<string, string>;
}

export interface AppScheduleReminder {
  enabled: boolean;
  unit?: string;
  amount?: string;
  repeat?: string;
}

//---
export interface AppQuestion {
  id: string;
  field_name: string;
  field_type: string;
  required_field: boolean;
  field_label: Record<string, string>;
  fieldLabelVariables?: QuestionTemplateVariable[];
  section_header?: Record<string, string>;
  select_choices_or_calculations?: AppQuestionChoice[];
  text_validation_type_or_show_slider_number?: string;
  text_validation_min?: string;
  text_validation_max?: string;
  field_annotation?: AppQuestionAnnotation;
  field_note?: Record<string, string>;
  range?: AppQuestionRange;
  matrix_group_name?: string;
  branching_logic?: string;
  conditionalLogic?: AppQuestionConditionalLogic;
  show_selected_label?: boolean;
  show_code?: boolean;
  multi_line?: boolean;
  calculation_fn?: string;
  calculation_args?: string;
  date_type?: string;
  isValid?: boolean;
  isActive: boolean;
  visible?: boolean;
  variables?: Record<string,QuestionTemplateVariable[]>;
}

export interface AppQuestionChoice {
  code: string,
  label: Record<string, string>;
}

export interface AppQuestionAnnotation {
  image: string; timer: {start: string; end: string;}; unit: string;
}

export interface AppQuestionRange {
  min: string; max: string; step: string; labelLeft?: Record<string, string>; labelRight?: Record<string, string>
}

export interface AppQuestionConditionalLogicRule {
  operand: string; operator: string; value: string;
}

export type AppQuestionConditionalLogicGroup = AppQuestionConditionalLogicRule[];
export type AppQuestionConditionalLogic = AppQuestionConditionalLogicGroup[];

export interface AppQuestionnaireLanguage {
  code: string; label: string; nativeLabel?: string;
}

export const DEFAULT_LANGUAGE: AppQuestionnaireLanguage =   {code:"en",label:"English",nativeLabel:"English"};

export const ISO_LANGUAGES: AppQuestionnaireLanguage[] = [
  {code:"da",label:"Danish",nativeLabel:"dansk"},
  {code:"nl",label:"Dutch",nativeLabel:"Nederlands, Vlaams"},
  {code:"en",label:"English",nativeLabel:"English"},
  {code:"fr",label:"French",nativeLabel:"français, langue française"},
  {code:"de",label:"German",nativeLabel:"Deutsch"},
  {code:"he",label:"Hebrew (modern)",nativeLabel:"עברית"},
  {code:"it",label:"Italian",nativeLabel:"Italiano"},
  {code:"pl",label:"Polish",nativeLabel:"polski"},
  {code:"es",label:"Spanish; Castilian",nativeLabel:"español, castellano"},
]
