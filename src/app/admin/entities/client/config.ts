import {FilterItem, TableElement} from "../../models/table.model";
import {FormFieldType} from "../../models/dialog.model";

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
