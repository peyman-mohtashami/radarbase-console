import {computed, inject, Injectable} from '@angular/core';
import {EntityRegistry} from '../../../shared/consts/entity-registry';
import {FilterItem, TableElement} from '../models/table.model';
import {ConfigurationService} from '../../../core/configuration/services/configuration.service';

@Injectable({providedIn: 'root'})
export class BaseConfigService {
  protected readonly tableElements: TableElement[] = [];
  protected readonly filters: FilterItem[] = [];
  protected readonly entityMetadata!: EntityRegistry;

  private readonly configurationService = inject(ConfigurationService);

  private config = computed(() => {
    return this.configurationService.entitiesCustomization()?.[this.entityMetadata?.name];
  })

  getFormFields() {
    return this.config()?.fields;
  }

  getTableFields() {
    return this.tableElements.filter(e => {
      if (e.editable) {
        return this.config()?.fields[e.name] !== false;
      } else {
        return true;
      }
    });
  }

  getTableFilters() {
    return this.filters.filter(f => this.config()?.fields[f.name] !== false);
  }

  getExtraFields() {
    return this.config()?.extraFields;
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

  setLatestFormEntry(value: unknown | null | undefined = null) {
    return localStorage.setItem(`${this.entityMetadata.name}_formEntry`, (value as string));
  }

  /**
   * Persists the currently open dialog (mode, target entity and entered fields)
   * so it can be restored after an unexpected close, e.g. a session expiry.
   */
  setDialogState(state: unknown | null | undefined) {
    const key = `${this.entityMetadata.name}_dialogState`;
    if (state === null || state === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(state));
  }

  getDialogState<T>(): T | null {
    const raw = localStorage.getItem(`${this.entityMetadata.name}_dialogState`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  clearDialogState() {
    localStorage.removeItem(`${this.entityMetadata.name}_dialogState`);
  }
}
