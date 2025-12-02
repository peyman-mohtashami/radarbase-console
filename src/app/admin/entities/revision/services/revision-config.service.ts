import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  {name: "timestamp", width: "w-72", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  {name: "author", width: "w-40", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  {name: "modifications", tableClass: "block", extensionClass: "hidden"}
];

export const filters: FilterItem[] = [];

@Injectable({providedIn: 'root'})
export class RevisionConfigService {
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
    return ENTITY_REGISTRY.revision;
  }
}
