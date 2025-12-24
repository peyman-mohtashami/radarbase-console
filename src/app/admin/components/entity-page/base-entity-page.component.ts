import {Component, effect, inject, signal, untracked} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseConfigService} from '../../services/base-config.service';
import {BaseDialogService} from '../../services/base-dialog.service';
import {ROLES} from '../../../shared/enums/roles';
import {ENTITY_REGISTRY} from '../../../shared/consts/entity-registry';
import {BaseDialogComponent} from '../dialog/base-dialog.component';
import {SelectedEntitiesService} from '../../services/selected-entities.service';

@Component({
  selector: 'app-base-entities-page',
  template: '',
})
export class BaseEntityPageComponent<T extends { _name: string; }, U> {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected selectedEntitiesService = inject(SelectedEntitiesService);

  protected configService!: BaseConfigService;
  protected dialogService!: BaseDialogService<T, U, BaseDialogComponent<T>>;

  entity = signal<T | undefined>(undefined);

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  init() {
    this.handleDialogUrlFragment();
  }

  destroy() {
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
          return;
        }
        break;
      case DialogMode.DELETE:
        this.navigateOnDeleteSuccess();
        return;

    }
    this.removeFragmentUrl();
  }

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
        if (fragment) this.dialogService.processUrlFragment(fragment);
      });
  }

  navigateOnUpdateSuccess(entity: T) {
    this.router.navigate(['../', entity._name], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }
}
