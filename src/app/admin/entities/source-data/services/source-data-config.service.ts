import {inject, Injectable} from '@angular/core';
import {instanceConfig} from '../../../../core/config/store/config.selectors';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {ENTITY_NAME} from '../../../enums/entities';
import {ConfigState} from '../../../../core/config/models/config.model';
import {FilterItem, TableElement} from '../../../models/table.model';

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false },
  {name: "sourceDataName", tableClass: "block", extensionClass: "hidden", sortable: true, editable: false },
  {name: "sourceType", width: "w-56", tableClass: "hidden md:block", extensionClass: "block md:hidden", editable: false},
  {name: "sourceDataType", width: "w-48", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true, editable: false },
  {name: "topic", tableClass: "hidden", extensionClass: "block", editable: true },
  {name: "processingState", width: "w-36", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true, editable: true },
  {name: "keySchema", tableClass: "hidden", extensionClass: "block", editable: true },
  {name: "valueSchema", tableClass: "hidden", extensionClass: "block", editable: true },
  {name: "frequency", width: "w-24", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true },
  {name: "unit", width: "w-28", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [];

@Injectable({providedIn: 'root'})
export class SourceDataConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => {
        console.log('Class: SourceDataConfigService, Function: , Line 33 c' , c);
        return c.entities[ENTITY_NAME.sourceData]?.['fields']
      })
    ), { initialValue: {} });

  getFormFields(): Record<string, boolean> {
    return this.config$();
  }

  getTableFields() {
    console.log('Class: SourceDataConfigService, Function: getTableFields, Line 40 this.config$()' , this.config$());
    const t =  TableElements.filter(e => {
      if (e.editable) {
        return this.config$()?.[e.name] !== false;
      } else {
        return true;
      }
    })
    console.log('Class: SourceDataConfigService, Function: getTableFields, Line 47 t' , t);
    return t;
  }

  getTableFilters() {
    return filters.filter(f => this.config$()?.[f.name] !== false);
  }
}
