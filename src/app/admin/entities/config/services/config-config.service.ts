import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

export const TableElements: TableElement[] = [
  // {name: "name", tableClass: "block", extensionClass: "hidden", sortable: true},
  // {name: "value", width: "w-40", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "type", width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  // {name: "extra", tableClass: "hidden xl:block", extensionClass: "block xl:hidden"},
  {name: "name", width: "w-64", tableClass:"block", extensionClass: "hidden", sortable: true},
  {name: "value", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: false},
  // {name: "default", width: "w-80", tableClass:"hidden md:block", extensionClass: "block md:hidden", sortable: false},
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
  private readonly appCustomizationService = inject(AppCustomizationService);

  private config = computed(() => {
    return this.appCustomizationService.entitiesCustomization()[this.getEntityMetadata().name];
  })

  getFormFields(): Record<string, boolean> {
    return this.config();
  }

  getTableFields() {
    return TableElements.filter(e => {
      if (e.editable) {
        return this.config()?.[e.name] !== false;
      } else {
        return true;
      }
    });
  }

  getTableFilters() {
    return filters.filter(f => this.config()?.[f.name] !== false);
  }

  getEntityMetadata() {
    return ENTITY_REGISTRY.config;
  }
}
