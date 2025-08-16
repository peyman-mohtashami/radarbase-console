import {FilterItem, TableElement} from "../../models/table.model";

export const PROPERTIES: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  { name: 'sourceId', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'sourceName', tableClass: "block", extensionClass: "hidden", sortable: true },
  { name: 'expectedSourceName', width: 'w-52', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'assigned', width: 'w-24', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true},
  { name: 'sourceType', width: 'w-52', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block"},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];


export const filters: FilterItem[] = [];
