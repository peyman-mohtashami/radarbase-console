import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../shared/models/table.model';
import {FormFieldType} from '../../../shared/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../shared/services/base-config.service';

export const TableElements: TableElement[] = [
  {name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true},
  { name: 'type', width:"w-64", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  // { name: 'completionWindow', width: "w-32", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  { name: 'status', width: "w-16", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  {
    name: 'questionCount',
    width: "w-16",
    tableClass: "hidden lg:block",
    extensionClass: "block lg:hidden",
  },
  {
    name: 'active',
    width: "w-16",
    tableClass: "hidden lg:block",
    extensionClass: "block lg:hidden",
  },
  {name: "actions", width: "w-24", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {name: 'search', label: 'ADMIN.questionnaire.filters.search', type: FormFieldType.INPUT},
]


@Injectable({providedIn: 'root'})
export class QuestionnaireConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.questionnaire;
}
