import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../../base-entities/models/table.model';
import {FormFieldType} from '../../../../base-entities/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true },
  { name: 'questionnaire', width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true },
  { name: 'repeatProtocol', width:"w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden" },
  { name: 'completionWindow', tableClass: "hidden", extensionClass: "block" },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  { name: '_search', label: 'ADMIN.organization.filters.search', type: FormFieldType.INPUT },
]


@Injectable({providedIn: 'root'})
export class ProtocolConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.protocol;
}
