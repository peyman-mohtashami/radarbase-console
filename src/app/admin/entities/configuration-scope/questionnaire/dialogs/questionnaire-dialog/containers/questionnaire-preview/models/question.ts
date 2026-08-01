export interface AppQuestion {
  field_name: string
  field_type: string
  field_label?: string
  section_header?: string
  required_field?: string
  select_choices_or_calculations?: SelectChoicesOrCalculations[]
  matrix_group_name?: string
  field_annotation?: any
  field_note?: string
  text_validation_type_or_show_slider_number?: string
  text_validation_max?: string
  text_validation_min?: string
  range?: Range
  branching_logic?: string
  form_name?: string
  // ----
  custom_alignment?: string
  evaluated_logic?: string
  identifier?: string
  matrix_ranking?: string
  question_number?: string
  //--------
  isAutoNext?: boolean
  editable?: boolean

  calculation_fn?: string;
  calculation_args?: string;
}

export interface SelectChoicesOrCalculations {
  code: string
  label: string
}

export interface Range {
  min: number
  max: number
  step?: number
  labelLeft?: string
  labelRight?: string
}

export enum QuestionType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  RANGE = 'range',
  RANGE_INFO = 'range-info',
  SLIDER = 'slider',
  AUDIO = 'audio',
  TIMED = 'timed',
  INFO = 'info',
  TEXT = 'text',
  YESNO = 'yesno',
  DESCRIPTIVE = 'descriptive',
  MATRIX_RADIO = 'matrix-radio',
  HEALTHKIT = 'healthkit',
  DATE = 'date',
  TIME = 'time',
  DURATION = 'duration',
  CALCULATION = 'calc',
}

export enum WebInputType {
  NHS = 'nhs'
}
