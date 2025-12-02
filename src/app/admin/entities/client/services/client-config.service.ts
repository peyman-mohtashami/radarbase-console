import {computed, inject, Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

export const TableElements: TableElement[] = [
  {name: "clientId", tableClass: "block", extensionClass: "hidden", sortable: true, classes: "ellipsis", editable: false},
  {name: "resourceIds", width: "w-64", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", editable: true},
  {name: "authorizedGrantTypes", width: "w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", editable: true},
  {name: "dynamic_registration", width: "w-28", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: true},
  {name: "accessTokenValiditySeconds", width: "w-28", tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: true},
  {name: "refreshTokenValiditySeconds", width: "w-28", tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: true},
  {name: "scope", tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "autoApproveScopes", tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "registeredRedirectUri", tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-28", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: '_search',
    label: 'ADMIN.client.filters.search',
    type: FormFieldType.INPUT,
  },
]


@Injectable({providedIn: 'root'})
export class ClientConfigService {
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
    return ENTITY_REGISTRY.client;
  }
}

