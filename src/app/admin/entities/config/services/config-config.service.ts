import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../base-entities/models/table.model';
import {FormFieldType} from '../../../base-entities/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  {name: "name", width: "w-64", tableClass:"block", extensionClass: "hidden", sortable: true},
  {name: "value", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: false},
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
