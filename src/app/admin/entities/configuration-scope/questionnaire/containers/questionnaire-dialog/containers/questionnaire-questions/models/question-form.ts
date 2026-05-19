import {FormControl} from "@angular/forms";

export interface QuestionForm {
  field_name: FormControl<string>;
  field_type: FormControl<string>;
  field_label: FormControl<Record<string, string>>;
  section_header: FormControl<Record<string, string>>;
  select_choices_or_calculations?: FormControl<QuestionFormChoice[]>;
  field_annotation?: FormControl<QuestionFormAnnotation>;
  range?: FormControl<QuestionFormRange>;
  branching_logic_enabled?: FormControl<boolean>;
  branching_logic?: FormControl<string>;
  text_validation_type_or_show_slider_number?: FormControl<string>;
  text_validation_min?: FormControl<string>;
  text_validation_max?: FormControl<string>;
}

export interface QuestionFormChoice {
  code: string;
  label: Record<string, string>;
}

export interface QuestionFormAnnotation {
  image: string;
  timer: { start: number; end: number };
  unit: string;
}

export interface QuestionFormRange {
  min: number;
  max: number;
  step: number;
}
