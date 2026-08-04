import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../shared/models/table.model';
import {FormFieldType} from '../../../shared/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../shared/services/base-config.service';

export const TableElements: TableElement[] = [
  {
    name: 'id',
    width: 'w-16',
    tableClass: 'hidden sm:flex',
    extensionClass: 'block sm:hidden',
    sortable: true
  },
  { name: 'name', tableClass: 'block', extensionClass: 'hidden', sortable: true, editable: false },
  {
    name: 'location',
    width: 'w-36',
    tableClass: 'hidden md:flex',
    extensionClass: 'block md:hidden',
    sortable: true,
    editable: true
  },
  { name: 'description', tableClass: 'hidden', extensionClass: 'hidden', editable: true },
  {
    name: 'projects',
    tableClass: 'hidden lg:flex',
    extensionClass: 'block lg:hidden',
    editable: true
  },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  { name: 'search', label: 'ADMIN.organization.filters.search', type: FormFieldType.INPUT },
]


@Injectable({providedIn: 'root'})
export class OrganizationConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.organization;
}
