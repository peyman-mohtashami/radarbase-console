import {Component, effect, inject, signal, untracked} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseConfigService} from '../../services/base-config.service';
import {BaseDialogService} from '../../services/base-dialog.service';

@Component({
  selector: 'app-base-entities-page',
  template: '',
})
export class BaseEntityPageComponent<T extends { _name: string; }> {
  protected readonly DialogMode = DialogMode;

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected configService!: BaseConfigService;
  protected dialogService!: BaseDialogService<T, any>;

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
        }
        break;
      case DialogMode.DELETE:
        this.navigateOnDeleteSuccess();
        break;
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
        const data = this.getDialogData(this.entity());
        if (fragment) this.dialogService.processUrlFragment(fragment, data)
      });
  }

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
