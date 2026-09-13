export interface DialogQuery {
  mode: DialogMode;
  id?: string;
}

export enum DialogMode {
  ADD = 'add',
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete',
  CLOSE = 'close',
}

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
