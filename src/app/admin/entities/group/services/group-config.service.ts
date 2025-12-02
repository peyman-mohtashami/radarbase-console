import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass:"hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false },
  {name: "name", tableClass:"block", extensionClass: "hidden", sortable: true, editable: false },
  {name: "actions", width: "w-14", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'name',
    label: 'ADMIN.group.name.tableLabel',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class GroupConfigService {
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
    return ENTITY_REGISTRY.group;
  }
}
