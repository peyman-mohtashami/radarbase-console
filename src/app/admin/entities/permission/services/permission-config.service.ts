import {inject, Injectable} from '@angular/core';
import {instanceConfig} from '../../../../core/config/store/config.selectors';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {ENTITY_NAME} from '../../../enums/entities';
import {ConfigState} from '../../../../core/config/models/config.model';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';

export const TableElements: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false},
  { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false},
  { name: 'email', width: 'w-64', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, editable: false},
  { name: 'activated', tableClass: "hidden", extensionClass: "hidden", editable: false},
  { name: 'firstName', width: 'w-32', tableClass: "hidden", extensionClass: "hidden", editable: true},
  { name: 'lastName', width: 'w-32', tableClass: "hidden", extensionClass: "hidden", editable: true},
  { name: 'langKey', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'roles', width: 'w-64', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", editable: false},
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block", editable: true },
  {name: "actions", width: "w-14", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.user.filters.search',
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
];

@Injectable({providedIn: 'root'})
export class PermissionConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.user]?.['fields'])
    ), { initialValue: {} });

  getFormFields(): Record<string, boolean> {
    return this.config$();
  }

  getTableFields() {
    return TableElements.filter(e => {
      if (e.editable) {
        return this.config$()?.[e.name] !== false;
      } else {
        return true;
      }
    });
  }

  getTableFilters() {
    return filters.filter(f => this.config$()?.[f.name] !== false);
  }
}
