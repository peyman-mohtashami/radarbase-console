import {TableElement} from "./table.model";

export enum FormFieldType {
  INPUT,
  SELECT,
  SWITCH,
  DATEPICKER,
  RANGE_PICKER,
  MULTISELECT,
  GROUP,
  ARRAY
}

export interface FormFieldConfig {
  name: string;
  notInCreate?: boolean;
  type: string;
  label?: string;
  rows?: number;
  maxlength?: number;
  disabled?: boolean;
  required?: boolean;
  hint?: boolean;
  placeholder?: string;
  validators?: {requiredValidator?: boolean; normalTextValidator?: boolean; longTextValidator?: boolean, duplicateValidator?: boolean};
  minDate?: Date;
  maxDate?: Date;
  options?: {value: string; label: string;}[];
  groupFields?: FormFieldConfig[];
}

export interface ConfigType {
  // editableFields: Record<string, boolean>
  // tableFields: Record<string, TableElement>;
  form: FormFieldConfig[]
}

export interface ConfigType2 {
  editableFields: Record<string, boolean>
  tableFields: Record<string, TableElement>;
  // form: FormFieldConfig[]
}

