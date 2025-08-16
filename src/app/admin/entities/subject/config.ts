import {FilterItem, TableElement} from "../../models/table.model";
import {FormFieldType} from "../../models/dialog.model";

export const FIELDS: any[] = [
  {name: "id", auto: true, nonEditable: true, type: 'text'},
  {name: "login" , auto: true, nonEditable: true, type: 'text'},
  {name: "externalId", type: 'text'},
  {name: "externalLink", type: 'url'},
  {name: "personName", type: 'text'},
  {name: "dateOfBirth", type: 'date'},
  {name: "group", type: 'select', optionsName: "groups" },
  {name: "attributes.humanReadableIdentifier", type: 'text'},
  {name: "attributes.participant_group", type: 'text'},
  // {sources: {},
  // {name: "attributes", type: 'group', groupFields: []},
  // enrollmentDate: {editable: false,},
  // createdBy: {editable: false,},
  // createdDate: {editable: false,},
  // lastModifiedBy: {editable: false,},
  // lastModifiedDate: {editable: false,},
]

// export const FIELDS: Record<string, any> = {
//   id: {auto: true, nonEditable: true, type: 'text'},
//   login: {auto: true, nonEditable: true, type: 'text'},
//   externalId: {type: 'text'},
//   externalLink: {type: 'url'},
//   personName: {type: 'text'},
//   dateOfBirth: {type: 'date'},
//   // group: {},
//   // sources: {},
//   // attributes: {},
//   // enrollmentDate: {editable: false,},
//   // createdBy: {editable: false,},
//   // createdDate: {editable: false,},
//   // lastModifiedBy: {editable: false,},
//   // lastModifiedDate: {editable: false,},
// }

// export const FIELDS: Record<string, any> = {
//   id: {editable: false},
//   login: {editable: false},
//   externalId: {},
//   externalLink: {},
//   personName: {},
//   dateOfBirth: {},
//   status: {editable: false,},
//   group: {},
//   sources: {},
//   attributes: {},
//   enrollmentDate: {editable: false,},
//   createdBy: {editable: false,},
//   createdDate: {editable: false,},
//   lastModifiedBy: {editable: false,},
//   lastModifiedDate: {editable: false,},
// }

export const REMOTE_FIELDS: Record<string, boolean | undefined> = {
  id: false,
  login: false,
  externalId: false,
  externalLink: false,
  personName: false,
  dateOfBirth: false,
  status: false,
  group: false,
  sources: false,
  attributes: false,
  enrollmentDate: false,
  createdBy: false,
  createdDate: false,
  lastModifiedBy: false,
  lastModifiedDate: false,
  email: true,
}

export const FORM_FIELDS: any[] = [
  {name: "id", type: "text", disabled: true, notInCreate: true},
  {name: "login", type: "text", disabled: true, notInCreate: true},
  {name: "externalId", type: "text", hint: true, validators: {normalTextValidator: true, duplicateValidator: true}},
  {name: "externalLink", type: "text", hint: true, validators: {normalTextValidator: true}}, //url validator
  {name: "personName", type: "text", hint: true, validators: {normalTextValidator: true}},
  {name: "dateOfBirth", type: "date", validators: {}, minDate: '01-01-1900', maxDate: 'TODAY'},
  {name: "group", type: "select"},
  {name: "sources"},
  {name: "attributes", type: "group", groupFields: [
      // {name: "Work-package", type: "text", validators: {}},
      // {name: "Phase", type: "text", validators: {}},
      // {name: "External-project-url", type: "text", validators: {}},
      // {name: "External-project-id", type: "text", validators: {}},
      // {name: "Privacy-policy-url", type: "text", validators: {}},
    ]},
];

export const REMOTE_FORM_FIELDS: any[] = [
];

export const TABLE_FIELDS: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  { name: 'login', width: 'w-80', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
  { name: 'info', width: 'w-56', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, showInDelete: true},
  { name: 'externalId', tableClass: "hidden", extensionClass: "block"},
  { name: 'externalLink', tableClass: "hidden", extensionClass: "block" },
  { name: 'personName', tableClass: "hidden", extensionClass: "block"},
  { name: 'dateOfBirth', tableClass: "hidden", extensionClass: "block"},
  { name: 'status', tableClass: "hidden", extensionClass: "block"},
  { name: 'group', width: 'w-40', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'sources', tableClass: "block", extensionClass: "block 2xl:hidden", sortable: true},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block"},
  { name: 'enrollmentDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block"},
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block"},
]


export const REMOTE_TABLE_FIELDS: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  { name: 'login', width: 'w-80', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
  { name: 'info', width: 'w-56', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, showInDelete: true},
  { name: 'externalId', tableClass: "hidden", extensionClass: "block"},
  { name: 'externalLink', tableClass: "hidden", extensionClass: "block" },
  { name: 'personName', tableClass: "hidden", extensionClass: "block"},
  { name: 'dateOfBirth', tableClass: "hidden", extensionClass: "block"},
  { name: 'status', tableClass: "hidden", extensionClass: "block"},
  { name: 'group', width: 'w-40', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'sources', tableClass: "block", extensionClass: "block 2xl:hidden", sortable: true},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block"},
  { name: 'enrollmentDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block"},
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block"},
]

export const PROPERTIES: TableElement[] = [
  {name: 'checkbox', width: 'w-12', tableClass: "block", extensionClass: "hidden"},
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  { name: 'login', width: 'w-80', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
  // { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
  { name: 'externalId', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block lg:hidden", sortable: true, showInDelete: true},
  // { name: 'externalId', width: 'w-40', tableClass: "hidden", extensionClass: "block md:hidden", sortable: true, showInDelete: true},
  { name: 'externalLink', tableClass: "hidden", extensionClass: "block" },
  { name: 'personName', tableClass: "hidden", extensionClass: "hidden", showInDelete: true},
  { name: 'dateOfBirth', width: 'w-36', tableClass: "hidden", extensionClass: "block xl:hidden", sortable: true},
  // { name: 'dateOfBirth', width: 'w-36', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'status', tableClass: "hidden", extensionClass: "block"},
  { name: 'group', width: 'w-40', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true},
  // { name: 'sources', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true},
  { name: 'sources', tableClass: "hidden block xl:block", extensionClass: "block 2xl:hidden", sortable: true},
  // { name: 'sources', width: "w-80", tableClass: "block", extensionClass: "block 2xl:hidden", sortable: true},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block", showInDelete: true},
  { name: 'enrollmentDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block"},
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block"},
  {name: "actions", width: "w-28", tableClass: "flex flex-wrap", extensionClass: "hidden"},
];

export const mergedProperties: TableElement[] = []

export const filters: FilterItem[] = [
  {
    name: 'login',
    label: 'ADMIN.subject.login.tableLabel',
    placeHolder: '',
    type: FormFieldType.INPUT,
  },
  {
    name: 'externalId',
    label: 'ADMIN.subject.externalId.tableLabel',
    placeHolder: '',
    type: FormFieldType.INPUT,
  },
  {
    name: 'personName',
    label: 'ADMIN.subject.personName.tableLabel',
    type: FormFieldType.INPUT,
  },
  {
    name: 'dateOfBirth.is',
    advanced: true,
    label: 'ADMIN.subject.dateOfBirth.tableLabel',
    type: FormFieldType.DATEPICKER,
  },
  // {
  //   name: 'groupId',
  //   advanced: true,
  //   label: 'ADMIN.subject.group.tableLabel',
  //   type: FormFieldType.SELECT,
  //   options: this.groups?.map((g) => ({ value: g.id, label: g.name })) || [],
  // },
  {
    name: '',
    advanced: true,
    names: ['enrollmentDate.from', 'enrollmentDate.to'],
    label: 'ADMIN.subject.enrollmentDate.tableLabel',
    type: FormFieldType.RANGE_PICKER,
  },
];
