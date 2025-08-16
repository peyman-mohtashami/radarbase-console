import {FilterItem, TableElement} from "../../models/table.model";

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  {name: "sourceDataName", tableClass: "block", extensionClass: "hidden", sortable: true },
  {name: "sourceType", width: "w-56", tableClass: "hidden md:block", extensionClass: "block md:hidden"},
  {name: "sourceDataType", width: "w-48", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true },
  {name: "topic", tableClass: "hidden", extensionClass: "block" },
  {name: "processingState", width: "w-36", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true },
  {name: "keySchema", tableClass: "hidden", extensionClass: "block" },
  {name: "valueSchema", tableClass: "hidden", extensionClass: "block" },
  {name: "frequency", width: "w-24", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true },
  {name: "unit", width: "w-28", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [];
