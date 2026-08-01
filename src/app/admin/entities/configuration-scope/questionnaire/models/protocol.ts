import {AppQuestionnaireLanguage} from './questionnaire';

export interface ProtocolWrapperDto extends Record<string, string | string[] | null | ProtocolDto[]> {
  version: string | null;
  schemaVersion: string | null;
  name: string | null;
  healthIssues: string[] | null;
  protocols: ProtocolDto[];
}

export interface ProtocolDto {
  name: string;
  type?: string;
  showIntroduction?: string;
  showInCalendar?: string;
  isDemo?: string;
  order?: string;
  questionnaire?: {
    repository: string;
    name: string;
    avsc: string;
  };
  appQuestionnaire?: string;
  startText: Record<string, string>;
  endText: Record<string, string>;
  warn: Record<string, string>;
  estimatedCompletionTime?: string;
  protocol?: SubProtocolDto;
  //---
  title?: Record<string, string>;
  description?: Record<string, string>;
  defaultLanguage: AppQuestionnaireLanguage;
  languages: AppQuestionnaireLanguage[];
  warningEnabled?: boolean;
  isValid?: boolean;
  isActive?: boolean;
}

export interface SubProtocolDto {
  referenceTimestamp?: {timestamp: string; format: string};
  repeatProtocol: {
    unit: string;
    amount: string;
  };
  repeatQuestionnaire: {
    unit: string;
    unitsFromZero: string[];
  };
  reminders?: {
    enabled?: boolean;
    unit: string;
    amount: string;
    repeat: string;
    title?: Record<string, string>;
    text?: Record<string, string>;
  };
  clinicalProtocol?: {
    requiresInClinicCompletion: boolean;
    repeatAfterClinicVisit?: {
      unit: string;
      unitsFromZero: string[];
    };
  };
  notification?: {
    title?: Record<string, string>;
    text?: Record<string, string>;
  };
  completionWindow?: {
    unit: string;
    amount: string;
  };
  //---
  onDemand?: boolean;
  relativeToReferenceTime?: boolean;
  repeatedProtocol?: boolean;

}

export interface QuestionnaireDto {
  name: string;
  languages: string[];
  questions: Record<string, QuestionDto[]>;
}


export interface QuestionDto {
  id?: string;
  field_name: string;
  field_type: string;
  required_field?: string;
  field_label: string;
  section_header?: string;
  select_choices_or_calculations?: {code: string, label: string}[];
  text_validation_type_or_show_slider_number?: string;
  text_validation_min?: string;
  text_validation_max?: string;
  field_annotation?: {image: string; timer: {start: string; end: string;}; unit: string;};
  field_note?: string;
  range?: {
    min: string;
    max: string;
    step: string;
    labelLeft?: string;
    labelRight?: string
  };
  matrix_group_name?: string;
  matrix_ranking?: string;
  conditionalLogic?: {operand: string; operator: string; value: string}[][];
  branching_logic?: string;
  show_selected_label?: boolean;
  multi_line?: boolean;
  calculation_fn?: string;
  calculation_args?: string;
  // date_min?: string;
  // date_max?: string;
  date_type?: string;
  isValid?: boolean;
}

export enum QuestionnaireTimeUnit {
  min = 'min',
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

