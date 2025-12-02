import { FormFieldType } from './dialog.model';
import {PageEvent} from "@angular/material/paginator";
import {DialogMode} from "../enums/dialog";

export interface FilterItem {
  name: string;
  advanced?: boolean;
  names?: string[];
  label: string;
  placeHolder?: string;
  type: FormFieldType;
  options?: { value: string | boolean | number; label: string }[];
}

export interface TableElement {
  name: string;
  width?: string;
  sortable?: boolean;
  tableClass?: string;
  extensionClass?: string;
  classes?: string;
  editable?: boolean;
  showInSummary?: boolean;
  showInDelete?: boolean; //!
}

export type RbSortOrder = 'asc' | 'desc' | '';

export interface RbSort {
  sortField: string;
  sortOrder: RbSortOrder;
}

export interface RbPageSortEvent {
  page: PageEvent;
  sort: RbSort;
}

export interface DialogQuery {
  mode: DialogMode;
  id?: string;
}

