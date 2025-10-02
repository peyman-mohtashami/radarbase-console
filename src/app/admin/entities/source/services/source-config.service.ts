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
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false },
  { name: 'sourceId', tableClass: "hidden", extensionClass: "hidden", editable: false },
  { name: 'sourceName', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false },
  { name: 'expectedSourceName', width: 'w-52', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true},
  { name: 'assigned', width: 'w-24', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: false},
  { name: 'sourceType', width: 'w-52', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: false},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = []


@Injectable({providedIn: 'root'})
export class SourceConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.source]?.['fields'])
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
