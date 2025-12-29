import {computed, inject, Injectable} from '@angular/core';
import {ENTITY_REGISTRY} from '../../../shared/consts/entity-registry';
import {FilterItem, TableElement} from '../models/table.model';
import {ConfigurationService} from '../../../core/configuration/services/configuration.service';

@Injectable({providedIn: 'root'})
export class BaseConfigService {
  protected readonly tableElements: TableElement[] = [];
  protected readonly filters: FilterItem[] = [];
  protected readonly entityMetadata: {name: string; icon: string; route: string} = ENTITY_REGISTRY.organization;

  private readonly configurationService = inject(ConfigurationService);

  private config = computed(() => {
    return this.configurationService.entitiesCustomization()[this.entityMetadata?.name];
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

  getStoredPageSize() {
    return +(localStorage.getItem(`${this.entityMetadata.name}_pageSize`) || '10');
  }

  getViewMode() {
    return localStorage.getItem(`${this.entityMetadata.name}_viewMode`) || 'list';
  }

  getLatestFormEntry() {
    return localStorage.getItem(`${this.entityMetadata.name}_formEntry`);
  }

  setStoredPageSize(pageSize: number) {
    localStorage.setItem(`${this.entityMetadata.name}_pageSize`, pageSize.toString());
  }

  setViewMode(viewMode: 'grid' | 'list') {
    localStorage.setItem(`${this.entityMetadata.name}_viewMode`, viewMode);
  }

  setLatestFormEntry(value: any) {
    return localStorage.setItem(`${this.entityMetadata.name}_formEntry`, value);
  }
}
