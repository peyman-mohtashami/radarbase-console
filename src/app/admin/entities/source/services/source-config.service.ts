import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

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
    return ENTITY_REGISTRY.source;
  }
}
