import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../../base-entities/models/table.model';
import {FormFieldType} from '../../../../base-entities/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  {
    name: 'id',
    width: 'w-16',
    tableClass: "hidden sm:block",
    extensionClass: "block sm:hidden",
    sortable: true,
    editable: false
  },
  {name: 'producer', tableClass: "hidden", extensionClass: "hidden", editable: false},
  {name: 'model', tableClass: "hidden", extensionClass: "hidden", editable: false},
  {name: 'catalogVersion', tableClass: "hidden", extensionClass: "hidden", editable: false},
  // { name: 'sourceTypeName', width: 'w-40', tableClass: "hidden", extensionClass: "hidden"},
  {name: '_name', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false},
  {
    name: 'sourceTypeScope',
    width: 'w-28',
    tableClass: "hidden md:block",
    extensionClass: "block md:hidden",
    sortable: true,
    editable: true
  },
  {
    name: 'canRegisterDynamically',
    width: 'w-40',
    tableClass: "hidden md:block",
    extensionClass: "block md:hidden",
    sortable: true,
    editable: false
  },
  // { name: 'description', tableClass: "hidden", extensionClass: "block", editable: true },
  {name: 'assessmentType', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: 'appProvider', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: 'sourceData', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.sourceType.filters.search',
    type: FormFieldType.INPUT,
  },
  // {
  //   name: 'canRegisterDynamically',
  //   advanced: true,
  //   label: 'ADMIN.sourceType.canRegisterDynamically.tableLabel',
  //   type: FormFieldType.SELECT,
  //   options: [
  //     {
  //       label: 'ADMIN.sourceType.canRegisterDynamically.manual',
  //       value: 'false',
  //     },
  //     {
  //       label: 'ADMIN.sourceType.canRegisterDynamically.dynamic',
  //       value: 'true',
  //     },
  //   ],
  // },
  // {
  //   name: 'sourceTypeScope',
  //   advanced: true,
  //   label: 'ADMIN.sourceType.sourceTypeScope.tableLabel',
  //   type: FormFieldType.SELECT,
  //   options: [
  //     { label: 'ADMIN.sourceType.sourceTypeScope.ACTIVE', value: 'ACTIVE' },
  //     { label: 'ADMIN.sourceType.sourceTypeScope.PASSIVE', value: 'PASSIVE' },
  //   ],
  // },
]


@Injectable({providedIn: 'root'})
export class SourceTypeConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.sourceType;
}
