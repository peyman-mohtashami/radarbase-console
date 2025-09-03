import {FilterItem, TableElement} from "../../models/table.model";
import {FormFieldType} from "../../models/dialog.model";
import {ProcessingState} from '../../../shared/models/radar-source-data.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Validator} from '../../../shared/utils/validators';

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
];

// override form = new FormGroup({
//   clientId: new FormControl({value: undefined, disabled: !!this.entity}, [Validator.requiredValidator, Validator.normalTextValidator]),
//   enableEmptySecret: new FormControl<boolean | null>(false),
//   clientSecret: new FormControl<string | null>(null, [Validator.requiredValidator]),
//   scope: new FormControl<string | null>(null, [Validator.requiredValidator]),
//   resourceIds: new FormControl<string | null>(null, [Validator.requiredValidator]),
//   formAuthorizedGrantTypes: new FormGroup({
//       refresh_token: new FormControl(true),
//       password: new FormControl(false),
//       authorization_code: new FormControl(true),
//       client_credentials: new FormControl(false),
//       implicit: new FormControl(false),
//     },
//     //   {
//     //   validators: [NotEmptyCheckValidator()],
//     // }
//   ),
//   registeredRedirectUri: new FormControl<string | null>(null),
//   autoApproveScopes: new FormControl<string | null>(null),
//   accessTokenValiditySeconds: new FormControl(0, {validators: [Validator.requiredValidator], nonNullable: true}),
//   refreshTokenValiditySeconds: new FormControl(0, {validators: [Validator.requiredValidator], nonNullable: true}),
//   additionalInformation: new FormGroup({
//     dynamic_registration: new FormControl(false),
//   }),
// });

export const PROPERTIES: TableElement[] = [
  {name: "clientId", tableClass: "flex", extensionClass: "hidden", sortable: true, classes: "ellipsis"},
  {name: "resourceIds", width: "w-64", tableClass: "hidden 2xl:flex", extensionClass: "flex 2xl:hidden"},
  {name: "authorizedGrantTypes", width: "w-64", tableClass: "hidden xl:flex", extensionClass: "flex xl:hidden"},
  {name: "dynamic_registration", width: "w-28", tableClass: "hidden sm:flex", extensionClass: "flex sm:hidden", sortable: true},
  {name: "accessTokenValiditySeconds", width: "w-28", tableClass: "hidden lg:flex", extensionClass: "flex lg:hidden", sortable: true},
  {name: "refreshTokenValiditySeconds", width: "w-28", tableClass: "hidden lg:flex", extensionClass: "flex lg:hidden", sortable: true},
  {name: "scope", tableClass: "hidden", extensionClass: "flex"},
  {name: "autoApproveScopes", tableClass: "hidden", extensionClass: "flex"},
  {name: "registeredRedirectUri", tableClass: "hidden", extensionClass: "flex"},
  {name: "actions", width: "w-28", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'clientId',
    label: 'ADMIN.client.clientId.tableLabel',
    type: FormFieldType.INPUT,
  },
]
