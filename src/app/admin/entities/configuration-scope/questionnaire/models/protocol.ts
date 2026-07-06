import {RadarOption} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';

export interface RadarProtocolWrapper extends Record<string, string | string[] | null | RadarProtocol[]> {
  version: string | null;
  schemaVersion: string | null;
  name: string | null;
  healthIssues: string[] | null;
  protocols: RadarProtocol[];
}

export interface RadarProtocol {
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
  protocol?: RadarSubProtocol;
  //---
  title?: Record<string, string>;
  description?: Record<string, string>;
  defaultLanguage: RadarOption;
  languages: RadarOption[];
  warningEnabled?: boolean;
  isValid?: boolean;
  isActive?: boolean;
}

export interface RadarSubProtocol {
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

export interface RadarQuestionnaire {
  name: string;
  languages: string[];
  questions: Record<string, RadarQuestion[]>;
}

// export interface RadarQuestion {
//   field_name: string;
//   field_type: string;
//   required_field?: string;
//   field_label: string;
//   section_header?: string;
//   select_choices_or_calculations?: {code: string, label: string}[];
//   text_validation_type_or_show_slider_number?: string;
//   text_validation_min?: string;
//   text_validation_max?: string;
//   // field_annotation?: any;
//   field_note?: string;
//   // range?: any;
//   matrix_group_name?: string;
//   matrix_ranking?: string;
//   branching_logic?: string;
//
//   id?: string;
//   // field_name: string;
//   // field_type: string;
//   // required_field?: string;
//   // field_label: Record<string, string>;
//   // section_header?: Record<string, string>;
//   // select_choices_or_calculations?: AppQuestionChoice[];
//   // text_validation_type_or_show_slider_number?: string;
//   // text_validation_min?: string;
//   // text_validation_max?: string;
//   field_annotation?: {image: string; timer: {start: string; end: string;}; unit: string;};
//   // field_note?: Record<string, string>;
//   range?: {
//     min: string;
//     max: string;
//     step: string;
//     labelLeft?: Record<string, string>;
//     labelRight?: Record<string, string>
//   };
//   // matrix_group_name?: string;
//   // branching_logic?: string;
//   show_selected_label?: boolean;
//   multi_line?: boolean;
//   date_min?: string;
//   date_max?: string;
//   date_type?: string;
//   // subQuestions?: AppQuestion[];
//   // valid?: boolean;
//   isValid?: boolean;
// }

export interface RadarQuestion {
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
  branching_logic?: string;
  show_selected_label?: boolean;
  multi_line?: boolean;
  date_min?: string;
  date_max?: string;
  date_type?: string;
  isValid?: boolean;
}
