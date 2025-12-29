import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../../base-entities/models/table.model';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false },
  { name: 'sourceId', tableClass: "hidden", extensionClass: "hidden", editable: false },
  { name: 'sourceName', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false },
  { name: 'expectedSourceName', width: 'w-52', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true},
  { name: 'assigned', width: 'w-24', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: false},
  { name: 'sourceType', width: 'w-52', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: false},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = []


@Injectable({providedIn: 'root'})
export class SourceConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.source;
}
