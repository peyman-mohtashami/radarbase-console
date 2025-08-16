import {FilterItem, TableElement} from "../../models/table.model";
import {FormFieldType} from "../../models/dialog.model";

export const PROPERTIES: TableElement[] = [
  {name: "id", width: "w-16", tableClass:"hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  {name: "name", tableClass:"block", extensionClass: "hidden", sortable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'name',
    label: 'ADMIN.group.name.tableLabel',
    type: FormFieldType.INPUT,
  },
];
