import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../../shared/models/table.model';
import {FormFieldType} from '../../../../shared/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../../shared/services/base-config.service';

export const TableElements: TableElement[] = [
  {name: "timestamp", tableClass: "block", extensionClass: "hidden", sortable: false},
  {name: "principal", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: false},
  {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: false},
  {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: false},
  {name: "actions", width: "w-14", tableClass: "flex xl:hidden!", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '',
    advanced: false,
    names: ['fromDate', 'toDate'],
    label: 'ADMIN.audit.filters.date',
    type: FormFieldType.RANGE_PICKER,
  },
];

@Injectable({providedIn: 'root'})
export class AuditConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.audit;
}
