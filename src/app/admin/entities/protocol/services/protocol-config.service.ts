import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../services/base-config.service';

export const TableElements: TableElement[] = [
  // { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true },
  { name: 'questionnaire', width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true },
  { name: 'repeatProtocol', width:"w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden" },
  // { name: 'completionWindow', width:"w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden" },
  { name: 'completionWindow', tableClass: "hidden", extensionClass: "block" },
  // { name: 'createdBy', tableClass: "hidden", extensionClass: "block" },
  // { name: 'modifiedBy', tableClass: "hidden", extensionClass: "block" },
  // { name: 'createdAt', tableClass: "hidden", extensionClass: "block" },
  // { name: 'modifiedAt', tableClass: "hidden", extensionClass: "block" },
  // { name: 'translations', tableClass: "hidden", extensionClass: "block"}
  // {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
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
