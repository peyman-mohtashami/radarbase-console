import {TableElement} from "../../models/table.model";

export const PROPERTIES: TableElement[] = [
  {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden"},
  {name: "timestamp", width: "w-72", tableClass: "hidden md:block", extensionClass: "block md:hidden"},
  {name: "auditor", width: "w-40", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
  {name: "modifications", tableClass: "block", extensionClass: "hidden"}
];
