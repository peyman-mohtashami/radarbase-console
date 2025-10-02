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
  {name: "clientId", tableClass: "block", extensionClass: "hidden", sortable: true, classes: "ellipsis", editable: false},
  {name: "resourceIds", width: "w-64", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", editable: true},
  {name: "authorizedGrantTypes", width: "w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", editable: true},
  {name: "_dynamic_registration", width: "w-28", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: true},
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
export class ClientConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.client]?.['fields'])
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
    })
  }

  getTableFilters() {
    return filters.filter(f => this.config$()?.[f.name] !== false);
  }
}
