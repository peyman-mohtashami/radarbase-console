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
  {name: "timestamp", tableClass: "block", extensionClass: "hidden", sortable: false},
  {name: "principal", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: false},
  {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: false},
  {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: false},
  {name: "actions", width: "w-14", tableClass: "flex xl:hidden!", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '',
    advanced: false,
    names: ['fromDate', 'toDate'],
    label: 'ADMIN.audit.filters.date',
    type: FormFieldType.RANGE_PICKER,
  },
];

@Injectable({providedIn: 'root'})
export class AuditConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => {
        return c.entities[ENTITY_NAME.audit]?.['fields']
      })
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
