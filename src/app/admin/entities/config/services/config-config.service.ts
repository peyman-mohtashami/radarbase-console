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
  // {name: "name", tableClass: "block", extensionClass: "hidden", sortable: true},
  // {name: "value", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
  {name: "name", width: "w-80", tableClass:"block", extensionClass: "hidden", sortable: true},
  {name: "value", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: false},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.config.filters.search',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class ConfigConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.config]?.['fields'])
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
