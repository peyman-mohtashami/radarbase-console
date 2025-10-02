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
  {
    name: 'id',
    width: 'w-16',
    tableClass: 'hidden sm:flex',
    extensionClass: 'block sm:hidden',
    sortable: true
  },
  { name: 'name', tableClass: 'block', extensionClass: 'hidden', sortable: true, editable: false },
  {
    name: 'location',
    width: 'w-36',
    tableClass: 'hidden md:flex',
    extensionClass: 'block md:hidden',
    sortable: true,
    editable: true
  },
  { name: 'description', tableClass: 'hidden', extensionClass: 'hidden', editable: true },
  {
    name: 'projects',
    tableClass: 'hidden lg:flex',
    extensionClass: 'block lg:hidden',
    editable: true
  },
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  { name: '_search', label: 'ADMIN.organization.filters.search', type: FormFieldType.INPUT },
]


@Injectable({providedIn: 'root'})
export class OrganizationConfigService {
  private readonly store = inject(Store);

  private readonly config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.organization]?.['fields'])
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
