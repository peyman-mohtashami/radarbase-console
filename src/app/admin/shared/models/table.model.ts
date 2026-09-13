import { FormFieldType } from './dialog.model';
import {PageEvent} from "@angular/material/paginator";

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

export type AppSortOrder = 'asc' | 'desc' | '';

export interface AppSort {
  sortField: string;
  sortOrder: AppSortOrder;
}

export interface AppPageSortEvent {
  page: PageEvent;
  sort: AppSort;
}

export enum DetailType {
  TABLE = 'table',
  SUMMARY = 'summary',
}


export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
export const MIN_ENTITIES_FOR_FILTERS = 0;
export const MIN_ENTITIES_FOR_PAGINATION = 0;

