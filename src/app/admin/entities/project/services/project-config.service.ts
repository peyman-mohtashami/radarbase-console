import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../services/base-config.service';

export const TableElements: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false},
  { name: 'projectName', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false},
  { name: 'startDate', width: 'w-28', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true},
  { name: 'endDate', width: 'w-28', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true},
  { name: 'projectStatus', width: 'w-28', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, editable: true},
  { name: 'description', tableClass: "hidden", extensionClass: "hidden", editable: true},
  { name: 'sourceTypes', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", editable: true},
  { name: 'location', tableClass: "hidden", extensionClass: "block", editable: true},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.project.filters.search',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class ProjectConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.project;
}
