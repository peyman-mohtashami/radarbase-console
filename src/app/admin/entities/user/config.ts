import {ConfigType, FormFieldType} from "../../models/dialog.model";
// import {ProjectStatus} from "@rb/models";
import {FilterItem, TableElement} from "../../models/table.model";
import {ProjectStatus} from '../../../shared/models/radar-project.model';

export const PROPERTIES: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true},
  { name: 'email', width: 'w-64', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  { name: 'activated', tableClass: "hidden", extensionClass: "hidden"},
  { name: 'firstName', width: 'w-32', tableClass: "hidden", extensionClass: "hidden"},
  { name: 'lastName', width: 'w-32', tableClass: "hidden", extensionClass: "hidden"},
  { name: 'langKey', tableClass: "hidden", extensionClass: "block" },
  { name: 'roles', width: 'w-64', tableClass: "hidden lg:block", extensionClass: "block lg:hidden"},
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block" },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];


export const config: ConfigType = {
  form: [
    {name: "id", type: "text", disabled: true, notInCreate: true},
    {name: "login", type: "text", required: true, hint: true, validators: {requiredValidator: true, normalTextValidator: true, duplicateValidator: true}},
    {name: "firstName", type: "text", hint: true, validators: {normalTextValidator: true}},
    {name: "lastName", type: "text", hint: true, validators: {normalTextValidator: true}},
    {name: "email", type: "text", hint: true, validators: {normalTextValidator: true}},
    // {name: "location", type: "text", required: true, validators: {requiredValidator: true, normalTextValidator: true}},
    // {name: "organizationName", type: "text", validators: {normalTextValidator: true}},
    // {name: "organization", type: "singleSelect", label: "ADMIN.project.organization.label", required: true, validators: {requiredValidator: true}},
    {name: "langKey", type: "simpleSelect", validators: {}, options: [{value: ProjectStatus.PLANNING, label: "ADMIN.project.projectStatus.PLANNING"}, {value: ProjectStatus.ONGOING, label: "ADMIN.project.projectStatus.ONGOING"}, {value: ProjectStatus.ENDED, label: "ADMIN.project.projectStatus.ENDED"}]},
    // {name: "startDate", type: "date", validators: {}, minDate: new Date(2000, 0, 1), maxDate: new Date(2050, 0, 1)},
    // {name: "endDate", type: "date", validators: {}, minDate: new Date(2000, 0, 1), maxDate: new Date(2050, 0, 1)},
    // {name: "sourceTypes", type: "multiSelect", label: "ADMIN.project.sourceTypes.label", validators: {}},
    {name: "roles", type: "group", validators: {}, groupFields: [
        {name: "sysAdmin", label: "ROLE_SYS_ADMIN", type: "slideToggle", validators: {}},
        {name: "organizationAdmin", label: "ROLE_ORGANIZATION_ADMIN", type: "slideToggle", validators: {}},
        {name: "organizations", type: "multiSelect", label: "ADMIN.organization.title.plural", validators: {}},
        {name: "projectAdmin",  label: "ROLE_PROJECT_ADMIN", type: "slideToggle", validators: {}},
        {name: "projects", type: "multiSelect", label: "ADMIN.project.title.plural", validators: {}},
      ]
    },
  ]
};

export const filters: FilterItem[] = [
  {
    name: 'search:login, email, firstName, lastName',
    label: 'Search ...',//'ADMIN.user.login.tableLabel',
    type: FormFieldType.INPUT,
  },
  // {
  //   name: 'login',
  //   label: 'ADMIN.user.login.tableLabel',
  //   type: FormFieldType.INPUT,
  // },
  // {
  //   name: 'email',
  //   label: 'ADMIN.user.email.tableLabel',
  //   type: FormFieldType.INPUT,
  // },
  {
    name: 'authority',
    advanced: true,
    label: 'ADMIN.user.authority.tableLabel',
    type: FormFieldType.SELECT,
    options: [
      { value: 'ROLE_SYS_ADMIN', label: 'ROLE_SYS_ADMIN' },
      { value: 'ROLE_ORGANIZATION_ADMIN', label: 'ROLE_ORGANIZATION_ADMIN' },
      { value: 'ROLE_PROJECT_ADMIN', label: 'ROLE_PROJECT_ADMIN' },
    ],
  },
  {
    name: 'projectOrOrganization',
    advanced: true,
    label: 'ADMIN.user.projectOrOrganization.tableLabel',
    type: FormFieldType.INPUT,
  },
]
