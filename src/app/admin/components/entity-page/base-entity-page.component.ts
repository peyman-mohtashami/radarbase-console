import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {FilterItem, RbSort, TableElement} from '../../models/table.model';
import {FilterEvent} from '../data-table-filter/data-table-filter.component';
import {Subject} from 'rxjs';
import {
  DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS,
} from '../../consts/default-table-values';
import {skip, takeUntil} from 'rxjs/operators';
import {ROLES} from '../../../shared/enums/roles';
import {SelectionModel} from '@angular/cdk/collections';
import {toObservable} from '@angular/core/rxjs-interop';
import {BaseEntityService} from '../../services/base-entity.service';
import {BaseConfigService} from '../../services/base-config.service';
import {BaseDialogService} from '../../services/base-dialog.service';
import {AppSourceType} from '../../entities/source-type/models/source-type';

@Component({
  selector: 'app-base-entities-page',
  template: '',
})
export class BaseEntityPageComponent<T extends { _name: string; }> {
  // protected readonly ROLES = ROLES;
  // protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;
  protected readonly DialogMode = DialogMode;

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  // protected entityService!: BaseEntityService<T, any>;
  protected configService!: BaseConfigService;
  protected dialogService!: BaseDialogService<T, any>;

  // entityName = this.configService.getEntityMetadata().name;
  // protected GRID_VIEW_ENABLED = false;
  // gridView = false;
  entity = signal<T | undefined>(undefined);

  // entities = signal<T[]>([]);

  // page = signal<PageEvent>({
  //   pageIndex: this.activatedRoute.snapshot.queryParams['pageIndex'] ?? 0,
  //   pageSize: this.activatedRoute.snapshot.queryParams['pageSize'] ?? DEFAULT_PAGE_SIZE,
  //   length: 0,
  // });
  // sort = signal<RbSort>({
  //   sortField: this.activatedRoute.snapshot.queryParams['sortField'] ?? 'id',
  //   sortOrder: this.activatedRoute.snapshot.queryParams['sortOrder'] ?? 'desc',
  // });
  // filter = signal<FilterEvent | undefined>(undefined);

  // params = computed(() => {
  //   const params: Params = {
  //     pageIndex: this.page().pageIndex,
  //     pageSize: this.page().pageSize,
  //     sortField: this.sort().sortField,
  //     sortOrder: this.sort().sortOrder,
  //     ...this.filter(),
  //   };
  //   return params;
  // });

  // loading = signal(false);
  // extensionClass = signal('hidden');

  // filterEnabled = false;
  // isFilterOpened = true;
  // selection = new SelectionModel<any>(true, []);

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    // toObservable(this.params)
    //   .pipe(
    //     skip(1),
    //     takeUntil(this._destroy$)
    //   )
    //   .subscribe(() => {
    //     this.loading.set(true);
    //     this.refreshEntities();
    //   });

    this.initializeDialogEffect();
  }

  init() {
    // const tableFields = this.configService.getTableFields();
    // const tableFilters: FilterItem[] = this.configService.getTableFilters();
    // this.filter = signal<FilterEvent>(
    //   tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
    //     map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
    //     return map;
    //   }, {})
    // );
    // this.extensionClass.set(this.getHighestPriorityClass(tableFields));
    this.handleDialogUrlFragment();
  }

  destroy() {
    // this.dialogService?.dialogUpdateEvent.set(undefined);
    this._destroy$.next();
    this._destroy$.complete();
  }


  initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService?.dialogUpdateEvent();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  handleDialogUpdate(updated: { mode: DialogMode | string, entity?: T }) {
    switch (updated.mode) {
      case DialogMode.EDIT:
        if (updated?.entity) {
          this.entity.set(updated.entity);
          this.navigateOnUpdateSuccess(updated.entity);
        }
        break;
      case DialogMode.DELETE:
        this.navigateOnDeleteSuccess();
        break;
    }
    this.removeFragmentUrl();
    // this.loading.set(false);
    // this.selection.clear();
  }

  // protected addEntityToView(entity?: T) {
  //   if (entity) {
  //     const entities = untracked(this.entities);
  //     this.entities.set([entity, ...entities]);
  //   }
  // }
  //
  // protected refreshEntities() {
  //   this.getEntities().subscribe({
  //     next: (value: T[]) => {
  //       this.selection.clear();
  //       this.loading.set(false);
  //       this.entities.set(value);
  //     }
  //   });
  // }

  // protected getEntities() {
  //   return this.entityService.getWithQuery(this.params())
  // }


  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        const data = this.getDialogData(this.entity());
        if (fragment) this.dialogService.processUrlFragment(fragment, data)
        // if (fragment) this.processUrlFragment(fragment);
      });
  }

  // processUrlFragment(fragment: string) {
  //   const entityMetadata = this.configService.getEntityMetadata()
  //   const [, action, entityType] = fragment.split('/');
  //   if (entityType === entityMetadata.name) {
  //     switch (action) {
  //       case 'edit':
  //         this.dialogService.openDialog(DialogMode.EDIT, this.getDialogData(this.entity()));
  //         break;
  //       case 'delete':
  //         this.dialogService.openDialog(DialogMode.DELETE, this.getDialogData(this.entity()));
  //         break;
  //     }
  //   }
  // }

  getDialogData(entity?: T) {
    return {entity}
  }

  navigateOnUpdateSuccess(entity: T) {
    throw new Error('Method not implemented.');
  }

  navigateOnDeleteSuccess() {
    throw new Error('Method not implemented.');
  }
}
