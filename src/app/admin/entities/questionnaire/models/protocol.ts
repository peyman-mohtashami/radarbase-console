import {AppQuestionnaireLanguage} from './questionnaire';
import {
  QuestionTemplateVariable
} from '../dialogs/questionnaire-dialog/tabs/questionnaire-variables/model/template-field.model';

export interface ProtocolWrapperDto {
  version?: string;
  schemaVersion?: string;
  name?: string;
  healthIssues?: string[];
  protocols: ProtocolDto[];
}

export interface ProtocolDto {
  id: string;
  //---
  name: string;
  languages: AppQuestionnaireLanguage[];
  defaultLanguage: AppQuestionnaireLanguage;
  onDemand: boolean;
  type?: string;
  showInCalendar?: boolean;
  estimatedCompletionTime?: string;
  isDemo?: boolean;
  order?: string;
  autoNextEnabled?: boolean;
  editEnabled?: boolean;
  previousEnabled?: boolean;
  //---
  questionnaire?: ProtocolQuestionnaireDto;
  appQuestionnaire?: string;
  //---
  title?: Record<string, string>;
  description?: Record<string, string>;
  showIntroduction?: string;
  startText?: Record<string, string>;
  endText: Record<string, string>;
  warningEnabled?: boolean;
  warn?: Record<string, string>;
  //---
  protocol?: SubProtocolDto;
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
  isValid?: boolean;
  isActive?: boolean;
}

export interface ProtocolQuestionnaireDto {
  repository: string;
  name: string;
  avsc: string;
}

export interface SubProtocolDto {
  relativeToReferenceTime?: boolean;
  referenceTimestamp?: ProtocolReferenceTimestampDto;
  repeatedProtocol?: boolean;
  repeatProtocol: ProtocolRepeatDto;
  repeatQuestionnaire?: ProtocolRepeatQuestionnaireDto;
  reminders?: ProtocolReminderDto;
  clinicalProtocol?: ClinicalProtocolDto;
  notification?: ProtocolNotificationDto;
  completionWindow?: ProtocolDurationDto;
}

export interface ProtocolReferenceTimestampDto {
  timestamp: string;
  format: string;
}

export interface ProtocolRepeatDto {
  unit: string;
  amount: string;
}

export interface ProtocolRepeatQuestionnaireDto {
  unit?: string;
  unitsFromZero?: string[];
}

export interface ProtocolReminderDto {
  enabled: boolean;
  unit?: string;
  amount?: string;
  repeat?: string;
  title?: Record<string, string>;
  text?: Record<string, string>;
}

export interface ClinicalProtocolDto {
  requiresInClinicCompletion: boolean;
  repeatAfterClinicVisit?: ProtocolRepeatQuestionnaireDto;
}

export interface ProtocolNotificationDto {
  title?: Record<string, string>;
  text?: Record<string, string>;
}

export interface ProtocolDurationDto {
  unit: string;
  amount: string;
}

//---
export interface QuestionnaireDto {
  id: string;
  name: string;
  languages: string[];
  questions: Record<string, QuestionDto[]>;
}


export interface QuestionDto {
  id: string;
  field_name: string;
  field_type: string;
  required_field: boolean;
  field_label: string;
  fieldLabelVariables?: QuestionTemplateVariable[];
  section_header?: string;
  select_choices_or_calculations?: QuestionChoiceDto[];
  text_validation_type_or_show_slider_number?: string;
  text_validation_min?: string;
  text_validation_max?: string;
  field_annotation?: QuestionAnnotationDto;
  field_note?: string;
  range?: QuestionRangeDto;
  matrix_group_name?: string;
  branching_logic?: string;
  conditionalLogic?: QuestionConditionalLogicDto;
  show_selected_label?: boolean;
  multi_line?: boolean;
  calculation_fn?: string;
  calculation_args?: string;
  // date_type?: string;
  isValid?: boolean;
  isActive: boolean;
  variables?: Record<string, QuestionTemplateVariable[]>;
}

export interface QuestionChoiceDto {
  code: string;
  label: string;
}

export interface QuestionAnnotationDto {
  image: string;
  timer: QuestionAnnotationTimerDto;
  unit: string;
}

export interface QuestionAnnotationTimerDto {
  start: string;
  end: string;
}

export interface QuestionRangeDto {
  min: string;
  max: string;
  step: string;
  labelLeft?: string;
  labelRight?: string;
}

export interface QuestionConditionalLogicRuleDto {
  operand: string;
  operator: string;
  value: string;
}

export type QuestionConditionalLogicGroupDto = QuestionConditionalLogicRuleDto[];
export type QuestionConditionalLogicDto = QuestionConditionalLogicGroupDto[];
