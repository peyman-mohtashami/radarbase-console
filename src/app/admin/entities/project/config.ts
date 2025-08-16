import {ConfigType, FormFieldType} from "../../models/dialog.model";
import {FilterItem, TableElement} from "../../models/table.model";
import {ProjectStatus} from '../../../shared/models/radar-project.model';

export const FIELDS: any[] = [
  {name: "id", nonEditable: true, type: "text", auto: true},
  {name: "projectName", nonEditable: true, type: "text", required: true, hint: true, validators: {requiredValidator: true, normalTextValidator: true, duplicateValidator: true}}, //*
  {name: "humanReadableProjectName", type: "text", hint: true, validators: {normalTextValidator: true}},
  {name: "description", type: "textarea", rows: 3, maxlength: 200, required: true, hint: true,  validators: {requiredValidator: true, longTextValidator: true}},
  {name: "location", type: "text", required: true, validators: {requiredValidator: true, normalTextValidator: true}},
  {name: "organizationName", type: "text", validators: {normalTextValidator: true}},
  {name: "organization", nonEditable: true, type: "select", required: true, validators: {requiredValidator: true}, optionsName: "organizations"},
  {name: "projectStatus", type: "simpleSelect", validators: {}, options: [{value: ProjectStatus.PLANNING, label: "ADMIN.project.projectStatus.PLANNING"}, {value: ProjectStatus.ONGOING, label: "ADMIN.project.projectStatus.ONGOING"}, {value: ProjectStatus.ENDED, label: "ADMIN.project.projectStatus.ENDED"}]},
  {name: "startDate", type: "date", validators: {}, minDate: '01-01-2000', maxDate: '01-01-2050'},
  {name: "endDate", type: "date", validators: {}, minDate: '01-01-2000', maxDate: '01-01-2050'},
  {name: "sourceTypes", nonEditable: true, type: "select", validators: {}, optionsName: "sourceTypes"},
  {name: "attributes.Work-package", type: "text", validators: {}},
  {name: "attributes.Phase", type: "text", validators: {}},
  {name: "attributes.External-project-url", type: "text", validators: {}},
  {name: "attributes.External-project-id", type: "text", validators: {}},
  {name: "attributes.Privacy-policy-url", type: "text", validators: {}}
];

export const PROPERTIES: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true},
  { name: 'startDate', width: 'w-28', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'endDate', width: 'w-28', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'projectStatus', width: 'w-28', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  { name: 'description', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'sourceTypes', tableClass: "hidden lg:block", extensionClass: "block lg:hidden"},
  { name: 'location', tableClass: "hidden", extensionClass: "block" },
  { name: 'attributes', tableClass: "hidden", extensionClass: "block" },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];


// export const config: ConfigType = {
//   form: [
//     {name: "id", type: "text", disabled: true, notInCreate: true}, //*
//     {name: "projectName", type: "text", required: true, hint: true, validators: {requiredValidator: true, normalTextValidator: true, duplicateValidator: true}}, //*
//     {name: "humanReadableProjectName", type: "text", hint: true, validators: {normalTextValidator: true}},
//     {name: "description", type: "textarea", rows: 3, maxlength: 200, required: true, hint: true,  validators: {requiredValidator: true, longTextValidator: true}},
//     {name: "location", type: "text", required: true, validators: {requiredValidator: true, normalTextValidator: true}},
//     {name: "organizationName", type: "text", validators: {normalTextValidator: true}},
//     {name: "organization", type: "singleSelect", label: "ADMIN.project.organization.label", required: true, validators: {requiredValidator: true}},
//     {name: "projectStatus", type: "simpleSelect", validators: {}, options: [{value: ProjectStatus.PLANNING, label: "ADMIN.project.projectStatus.PLANNING"}, {value: ProjectStatus.ONGOING, label: "ADMIN.project.projectStatus.ONGOING"}, {value: ProjectStatus.ENDED, label: "ADMIN.project.projectStatus.ENDED"}]},
//     {name: "startDate", type: "date", validators: {}, minDate: new Date(2000, 0, 1), maxDate: new Date(2050, 0, 1)},
//     {name: "endDate", type: "date", validators: {}, minDate: new Date(2000, 0, 1), maxDate: new Date(2050, 0, 1)},
//     {name: "sourceTypes", type: "multiSelect", label: "ADMIN.project.sourceTypes.label", validators: {}},
//     {name: "attributes", type: "group", groupFields: [
//         {name: "Work-package", type: "text", validators: {}},
//         {name: "Phase", type: "text", validators: {}},
//         {name: "External-project-url", type: "text", validators: {}},
//         {name: "External-project-id", type: "text", validators: {}},
//         {name: "Privacy-policy-url", type: "text", validators: {}},
//       ]
//     },
//   ]
// }

export const filters: FilterItem[] = [
  {
    name: 'search:projectName,description',
    label: 'Search ...',//'ADMIN.project.projectName.tableLabel',
    type: FormFieldType.INPUT,
  },
];
