import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../services/base-config.service';

export const TableElements: TableElement[] = [
  // {name: "name", tableClass: "block", extensionClass: "hidden", sortable: true},
  // {name: "value", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
  {name: "name", width: "w-64", tableClass:"block", extensionClass: "hidden", sortable: true},
  {name: "value", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: false},
  // {name: "default", width: "w-80", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: false},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.config.filters.search',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class ConfigConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.config;
}
