import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

export const TableElements: TableElement[] = [
  // { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true },
  { name: 'questionnaire', width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true },
  { name: 'repeatProtocol', width:"w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden" },
  // { name: 'completionWindow', width:"w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden" },
  { name: 'completionWindow', tableClass: "hidden", extensionClass: "block" },
  // { name: 'createdBy', tableClass: "hidden", extensionClass: "block" },
  // { name: 'modifiedBy', tableClass: "hidden", extensionClass: "block" },
  // { name: 'createdAt', tableClass: "hidden", extensionClass: "block" },
  // { name: 'modifiedAt', tableClass: "hidden", extensionClass: "block" },
  // { name: 'translations', tableClass: "hidden", extensionClass: "block"}
  // {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
  {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  { name: '_search', label: 'ADMIN.organization.filters.search', type: FormFieldType.INPUT },
]


@Injectable({providedIn: 'root'})
export class ProtocolConfigService {
  private readonly appCustomizationService = inject(AppCustomizationService);

  config = computed(() => {
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
    return ENTITY_REGISTRY.protocol;
  }
}
