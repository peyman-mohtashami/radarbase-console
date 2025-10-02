import {inject, Injectable} from '@angular/core';
import {instanceConfig} from '../../../../core/config/store/config.selectors';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {ENTITY_NAME} from '../../../enums/entities';
import {ConfigState} from '../../../../core/config/models/config.model';
import {FilterItem, TableElement} from '../../../models/table.model';

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  {name: "timestamp", width: "w-72", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  {name: "author", width: "w-40", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  {name: "modifications", tableClass: "block", extensionClass: "hidden"}
];

export const filters: FilterItem[] = [];

@Injectable({providedIn: 'root'})
export class RevisionConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => {
        return c.entities[ENTITY_NAME.revision]?.['fields']
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
