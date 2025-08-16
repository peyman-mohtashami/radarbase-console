import {TableElement} from "../../models/table.model";

export const TableElements: TableElement[] = [
  {name: "timestamp", tableClass: "block", extensionClass: "hidden", sortable: true},
  {name: "principal", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
  {name: "actions", width: "w-14", tableClass: "flex xl:hidden!", extensionClass: "hidden"},
];
