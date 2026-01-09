import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../../base-entities/models/table.model';
import {FormFieldType} from '../../../../base-entities/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false},
  { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false},
  { name: 'email', width: 'w-64', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, editable: false},
  { name: 'activated', tableClass: "hidden", extensionClass: "hidden", editable: false},
  { name: 'firstName', width: 'w-32', tableClass: "hidden", extensionClass: "hidden", editable: true},
  { name: 'lastName', width: 'w-32', tableClass: "hidden", extensionClass: "hidden", editable: true},
  { name: 'langKey', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'roles', width: 'w-64', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", editable: false},
  { name: 'createdBy', width: 'w-32', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'lastModifiedBy', width: 'w-32', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block", editable: true },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  // {
  //   name: '_search',
  //   label: 'ADMIN.user.filters.search',
  //   type: FormFieldType.INPUT,
  // },
  {
    name: 'login',
    label: 'ADMIN.user.login.tableLabel',
    type: FormFieldType.INPUT,
  },
  {
    name: 'email',
    label: 'ADMIN.user.email.tableLabel',
    type: FormFieldType.INPUT,
  },
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
];

@Injectable({providedIn: 'root'})
export class UserConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.user;
}
