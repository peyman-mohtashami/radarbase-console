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
  { name: 'producer', tableClass: "hidden", extensionClass: "hidden", editable: false },
  { name: 'model', tableClass: "hidden", extensionClass: "hidden", editable: false },
  { name: 'catalogVersion', tableClass: "hidden", extensionClass: "hidden", editable: false },
  // { name: 'sourceTypeName', width: 'w-40', tableClass: "hidden", extensionClass: "hidden"},
  { name: '_name', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false},
  { name: 'sourceTypeScope', width: 'w-28', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, editable: true},
  { name: 'canRegisterDynamically', width: 'w-40', tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true, editable: false},
  // { name: 'description', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'assessmentType', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'appProvider', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'sourceData', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.sourceType.filters.search',
    type: FormFieldType.INPUT,
  },
  // {
  //   name: 'canRegisterDynamically',
  //   advanced: true,
  //   label: 'ADMIN.sourceType.canRegisterDynamically.tableLabel',
  //   type: FormFieldType.SELECT,
  //   options: [
  //     {
  //       label: 'ADMIN.sourceType.canRegisterDynamically.manual',
  //       value: 'false',
  //     },
  //     {
  //       label: 'ADMIN.sourceType.canRegisterDynamically.dynamic',
  //       value: 'true',
  //     },
  //   ],
  // },
  // {
  //   name: 'sourceTypeScope',
  //   advanced: true,
  //   label: 'ADMIN.sourceType.sourceTypeScope.tableLabel',
  //   type: FormFieldType.SELECT,
  //   options: [
  //     { label: 'ADMIN.sourceType.sourceTypeScope.ACTIVE', value: 'ACTIVE' },
  //     { label: 'ADMIN.sourceType.sourceTypeScope.PASSIVE', value: 'PASSIVE' },
  //   ],
  // },
]


@Injectable({providedIn: 'root'})
export class SourceTypeConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.sourceType]?.['fields'])
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
