// import {ConfigType2, FormFieldType} from "../../models/dialog.model";
// import {FilterItem, TableElement} from "../../models/table.model";
//
// export const PROPERTIES: TableElement[] = [
//   { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
//   { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true },
//   { name: 'createdBy', tableClass: "hidden", extensionClass: "block" },
//   { name: 'modifiedBy', tableClass: "hidden", extensionClass: "block" },
//   { name: 'createdDate', tableClass: "hidden", extensionClass: "block" },
//   { name: 'modifiedDate', tableClass: "hidden", extensionClass: "block" },
//   { name: 'questionCount', width: "w-32", tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true},
//   // { name: 'translations', tableClass: "hidden", extensionClass: "block"}
//   {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
// ];
//
//
// export const config: ConfigType2 = {
//   editableFields: {
//     id: false,
//     name: false,
//     location: true,
//     description: true,
//   },
//   tableFields: {
//     id: { name: 'id', width: 'w-16', tableClass: 'hidden sm:flex', extensionClass: 'flex sm:hidden',  sortable: true },
//     name: { name: 'name', tableClass: 'block', extensionClass: 'hidden', sortable: true },
//     location: { name: 'location', width: 'w-36', tableClass: 'hidden md:flex', extensionClass: 'flex md:hidden', sortable: true },
//     description: { name: 'description', tableClass: 'hidden', extensionClass: 'hidden' },
//     projects: { name: 'projects', tableClass: 'hidden lg:flex', extensionClass: 'flex lg:hidden' },
//   },
// }
//
// export const customConfig = {
//   configFields: {
//     location: true, //false
//     description: true, //false
//   },
//   configTableFields: {
//     id: { name: 'id', width: 'w-16', tableClass: 'hidden sm:flex', extensionClass: 'flex sm:hidden',  sortable: true },
//     name: { name: 'name', tableClass: 'block', extensionClass: 'hidden', sortable: true },
//     location: { name: 'location', width: 'w-36', tableClass: 'hidden md:flex', extensionClass: 'flex md:hidden', sortable: true },
//     description: { name: 'description', tableClass: 'hidden', extensionClass: 'hidden' },
//     projects: { name: 'projects', tableClass: 'hidden lg:flex', extensionClass: 'flex lg:hidden' },
//   },
// }
//
// export const filters: FilterItem[] = [
//   {
//     name: 'name',
//     label: 'ADMIN.questionnaire.name.tableLabel',
//     type: FormFieldType.INPUT,
//   },
// ];
