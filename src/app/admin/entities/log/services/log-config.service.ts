import {inject, Injectable} from '@angular/core';
import {instanceConfig} from '../../../../core/config/store/config.selectors';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {ENTITY_NAME} from '../../../enums/entities';
import {ConfigState} from '../../../../core/config/models/config.model';
import {FilterItem, TableElement} from '../../../models/table.model';

export const TableElements: TableElement[] = [
  {name: "name", width: "w-full md:w-1/2", tableClass: "block", extensionClass: "hidden", sortable: true},
];

export const filters: FilterItem[] = []


@Injectable({providedIn: 'root'})
export class LogConfigService {
  private readonly store = inject(Store);

  private readonly config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.log]?.['fields'])
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
