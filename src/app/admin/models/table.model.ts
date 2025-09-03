import { FormFieldType } from './dialog.model';

export interface FilterItem {
  name: string;
  advanced?: boolean;
  names?: string[];
  label: string;
  placeHolder?: string;
  type: FormFieldType;
  options?: { value: string | boolean | number; label: string }[];
}
//
// export enum TableType {
//   'GET_ALL',
//   'GET_WITH_QUERY',
//   'GET_ALL_FROM_STORE',
// }

export interface TableElement {
  name: string;
  width?: string;
  sortable?: boolean;
  tableClass?: string;
  extensionClass?: string;
  classes?: string;
  showInDelete?: boolean;
}

