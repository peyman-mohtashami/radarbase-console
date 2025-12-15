import {computed, inject, Injectable} from '@angular/core';
import {AppCustomizationService} from '../../core/app-customization/services/app-customization.service';
import {ENTITY_REGISTRY} from '../../shared/consts/entity-registry';
import {FilterItem, TableElement} from '../models/table.model';

@Injectable({providedIn: 'root'})
export class BaseConfigService {
  protected readonly tableElements: TableElement[] = [];
  protected readonly filters: FilterItem[] = [];
  protected readonly entityMetadata: {name: string; icon: string; route: string} = ENTITY_REGISTRY.organization;

  private readonly appCustomizationService = inject(AppCustomizationService);

  private config = computed(() => {
    return this.appCustomizationService.entitiesCustomization()[this.entityMetadata?.name];
  })

  getFormFields(): Record<string, boolean> {
    return this.config();
  }

  getTableFields() {
    return this.tableElements.filter(e => {
      if (e.editable) {
        return this.config()?.[e.name] !== false;
      } else {
        return true;
      }
    });
  }

  getTableFilters() {
    return this.filters.filter(f => this.config()?.[f.name] !== false);
  }

  getExtraFields() {
    return this.config().extraFields;
  }

  getEntityMetadata() {
    return this.entityMetadata;
  }
}
