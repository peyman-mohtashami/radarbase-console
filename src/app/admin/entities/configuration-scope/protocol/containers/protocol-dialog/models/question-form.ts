import {FormControl, FormGroup} from "@angular/forms";

export interface QuestionForm {
  field_name: FormControl<string>;
  field_type: FormControl<string>;
  field_label: FormControl<Record<string, string>>;
  section_header: FormControl<Record<string, string>>;
  select_choices_or_calculations?: FormControl<{
    code: string;
    label: Record<string, string>;
  }[]>;
  field_annotation?: FormGroup<{
    image: FormControl<string | null>;
    timer: FormGroup<{
      start: FormControl<number | null>;
      end: FormControl<number | null>;
    }>;
    unit: FormControl<string | null>;
  }>;
  range?: FormGroup<{
    min: FormControl<number | null>;
    max: FormControl<number | null>;
    step: FormControl<number | null>;
  }>;
  branching_logic?: FormControl<string>;
}
