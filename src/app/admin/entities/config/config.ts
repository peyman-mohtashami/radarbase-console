import {TableElement} from "../../models/table.model";

// export const PROPERTIES: TableElement[] = [
//   {name: "timestamp", tableClass: "block", extensionClass: "hidden", sortable: true},
//   {name: "principal", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
//   {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
//   {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
// ];

export const PROPERTIES: TableElement[] = [
  // {name: "name", tableClass: "block", extensionClass: "hidden", sortable: true},
  // {name: "value", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
  {name: "name", width: "w-80", tableClass:"block", extensionClass: "hidden", sortable: true},
  {name: "value", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];
