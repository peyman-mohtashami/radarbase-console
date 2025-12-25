import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../base-entities/models/table.model';
import {FormFieldType} from '../../../base-entities/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  {name: "clientId", tableClass: "block", extensionClass: "hidden", sortable: true, classes: "ellipsis", editable: false},
  {name: "resourceIds", width: "w-64", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", editable: true},
  {name: "authorizedGrantTypes", width: "w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", editable: true},
  {name: "dynamic_registration", width: "w-28", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: true},
  {name: "accessTokenValiditySeconds", width: "w-28", tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: true},
  {name: "refreshTokenValiditySeconds", width: "w-28", tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: true},
  {name: "scope", tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "autoApproveScopes", tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "registeredRedirectUri", tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-28", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.client.filters.search',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class ClientConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.client;
}

