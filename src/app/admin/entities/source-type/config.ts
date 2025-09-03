import {FilterItem, TableElement} from "../../models/table.model";
import {FormFieldType} from "../../models/dialog.model";
import {ProcessingState} from '../../../shared/models/radar-source-data.model';

export const FIELDS: any[] = [
  {name: "id", auto: true, nonEditable: true, type: 'text'},
  {name: "producer", type: 'text', validators: {requiredValidator: true, normalTextValidator: true}},
  {name: "model", type: 'text', validators: {requiredValidator: true, normalTextValidator: true}},
  {name: "catalogVersion", type: 'text', validators: {requiredValidator: true, normalTextValidator: true}},
  {name: "sourceTypeScope", type: 'simpleSelect', validators: {requiredValidator: true},
    options: [
      {id: 0, name: 'ACTIVE'},
      {id: 1, name: "PASSIVE"},
      // {id: 2, name: ProcessingState.RADAR},
      // {id: 3, name: ProcessingState.VENDOR},
      // {id: 4, name: ProcessingState.UNKNOWN}
    ]
  },
  {name: "canRegisterDynamically", type: 'slideToggle', hint: 'ADMIN.sourceType.canRegisterDynamically.hint'},
  {name: "name", type: 'text'},
  {name: "description", type: 'textarea'},
  {name: "assessmentType", type: 'text'},
  {name: "appProvider", type: 'text'},
  // {name: "sourceType", type: 'select', optionsName: "sourceTypes", validators: {requiredValidator: true}},
  // {name: "sourceTypeScope", type: 'simpleSelect',
  //   options: [
  //     {id: 0, name: ProcessingState.RAW},
  //     {id: 1, name: ProcessingState.DERIVED},
  //     {id: 2, name: ProcessingState.RADAR},
  //     {id: 3, name: ProcessingState.VENDOR},
  //     {id: 4, name: ProcessingState.UNKNOWN}
  //   ]
  // },

];

// override form = new FormGroup({
//   id: new FormControl({ value: undefined, disabled: true }),
//   producer: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
//   model: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
//   catalogVersion: new FormControl("", [Validator.requiredValidator, Validator.normalTextValidator]),
//   sourceTypeScope: new FormControl("", [Validator.requiredValidator]),
//   canRegisterDynamically: new FormControl(false),
//   name: new FormControl(""),
//   description: new FormControl("", [Validator.longTextValidator]),
//   assessmentType: new FormControl(""),
//   appProvider: new FormControl(""),
// });

export const PROPERTIES: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  { name: 'producer', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'model', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'catalogVersion', tableClass: "hidden", extensionClass: "hidden" },
  { name: 'sourceTypename', width: 'w-40', tableClass: "hidden", extensionClass: "hidden"},
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true},
  { name: 'sourceTypeScope', width: 'w-28', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  { name: 'canRegisterDynamically', width: 'w-40', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  { name: 'description', tableClass: "hidden", extensionClass: "block" },
  { name: 'assessmentType', tableClass: "hidden", extensionClass: "block" },
  { name: 'appProvider', tableClass: "hidden", extensionClass: "block" },
  { name: 'sourceData', tableClass: "hidden", extensionClass: "block" },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'name',
    label: 'Name', //'ADMIN.sourceType.producerModelCatalogVersion.tableLabel',
    type: FormFieldType.INPUT,
  },
  {
    name: 'canRegisterDynamically',
    advanced: true,
    label: 'ADMIN.sourceType.canRegisterDynamically.tableLabel',
    type: FormFieldType.SELECT,
    options: [
      {
        label: 'ADMIN.sourceType.canRegisterDynamically.manual',
        value: 'false',
      },
      {
        label: 'ADMIN.sourceType.canRegisterDynamically.dynamic',
        value: 'true',
      },
    ],
  },
  {
    name: 'sourceTypeScope',
    advanced: true,
    label: 'ADMIN.sourceType.sourceTypeScope.tableLabel',
    type: FormFieldType.SELECT,
    options: [
      { label: 'ADMIN.sourceType.sourceTypeScope.ACTIVE', value: 'ACTIVE' },
      { label: 'ADMIN.sourceType.sourceTypeScope.PASSIVE', value: 'PASSIVE' },
    ],
  },
]
