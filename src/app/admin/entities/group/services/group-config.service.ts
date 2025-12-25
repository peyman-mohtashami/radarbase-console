import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../base-entities/models/table.model';
import {FormFieldType} from '../../../base-entities/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass:"hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false },
  {name: "name", tableClass:"block", extensionClass: "hidden", sortable: true, editable: false },
  {name: "actions", width: "w-14", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'name',
    label: 'ADMIN.group.name.tableLabel',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class GroupConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.group;
}
