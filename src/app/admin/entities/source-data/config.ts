import {FilterItem, TableElement} from "../../models/table.model";
import {ProcessingState} from '../../../shared/models/radar-source-data.model';

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

export const FIELDS: any[] = [
  {name: "id", auto: true, nonEditable: true, type: 'text'},
  {name: "sourceDataType", type: 'text', validators: {requiredValidator: true, normalTextValidator: true}},
  {name: "sourceType", type: 'select', optionsName: "sourceTypes", validators: {requiredValidator: true}},
  {name: "sourceDataName", type: 'text', validators: {requiredValidator: true}},
  {name: "processingState", type: 'simpleSelect',
    options: [
      {id: 0, name: ProcessingState.RAW},
      {id: 1, name: ProcessingState.DERIVED},
      {id: 2, name: ProcessingState.RADAR},
      {id: 3, name: ProcessingState.VENDOR},
      {id: 4, name: ProcessingState.UNKNOWN}
    ]
  },
  {name: "topic", type: 'text'},
  {name: "keySchema", type: 'text'},
  {name: "valueSchema", type: 'text'},
  {name: "frequency", type: 'text'},
  {name: "unit", type: 'text'},
  // {name: "attributes.humanReadableIdentifier", type: 'text'},
  // {name: "attributes.participant_group", type: 'text'},
  // {sources: {},
  // {name: "attributes", type: 'group', groupFields: []},
  // enrollmentDate: {editable: false,},
  // createdBy: {editable: false,},
  // createdDate: {editable: false,},
  // lastModifiedBy: {editable: false,},
  // lastModifiedDate: {editable: false,},
]

// override form = new FormGroup({
//   id: new FormControl({ value: undefined, disabled: true }),
//   sourceDataType: new FormControl("",[Validator.requiredValidator, Validator.normalTextValidator]),
//   sourceType: new FormControl("", [Validator.requiredValidator]),
//   sourceDataName: new FormControl("",[Validator.requiredValidator]),
//   processingState: new FormControl(""),
//   topic: new FormControl(""),
//   keySchema: new FormControl(""),
//   valueSchema: new FormControl(""),
//   frequency: new FormControl(""),
//   unit: new FormControl(""),
// });


