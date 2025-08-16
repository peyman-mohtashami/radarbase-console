import {FilterItem, TableElement} from "../../models/table.model";
import {FormFieldType} from "../../models/dialog.model";

export const PROPERTIES: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  { name: 'producer', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'model', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'catalogVersion', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'sourceTypename', width: 'w-40', tableClass: "hidden", extensionClass: "hidden"},
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true},
  { name: 'sourceTypeScope', width: 'w-28', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  { name: 'canRegisterDynamically', width: 'w-40', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  { name: 'description', tableClass: "hidden", extensionClass: "block" },
  { name: 'assessmentType', tableClass: "hidden", extensionClass: "block" },
  { name: 'appProvider', tableClass: "hidden", extensionClass: "block" },
  { name: 'sourceData', tableClass: "hidden", extensionClass: "block" },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'name',
    label: 'Name', //'ADMIN.sourceType.producerModelCatalogVersion.tableLabel',
    type: FormFieldType.INPUT,
  },
  {
    name: 'canRegisterDynamically',
    advanced: true,
    label: 'ADMIN.sourceType.canRegisterDynamically.tableLabel',
    type: FormFieldType.SELECT,
    options: [
      {
        label: 'ADMIN.sourceType.canRegisterDynamically.manual',
        value: 'false',
      },
      {
        label: 'ADMIN.sourceType.canRegisterDynamically.dynamic',
        value: 'true',
      },
    ],
  },
  {
    name: 'sourceTypeScope',
    advanced: true,
    label: 'ADMIN.sourceType.sourceTypeScope.tableLabel',
    type: FormFieldType.SELECT,
    options: [
      { label: 'ADMIN.sourceType.sourceTypeScope.ACTIVE', value: 'ACTIVE' },
      { label: 'ADMIN.sourceType.sourceTypeScope.PASSIVE', value: 'PASSIVE' },
    ],
  },
]
