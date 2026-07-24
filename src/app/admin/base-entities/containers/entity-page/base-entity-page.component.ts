import {Component, effect, inject, OnDestroy, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {BaseConfigService} from '../../services/base-config.service';
import {BaseDialogService} from '../../services/base-dialog.service';
import {ROLES} from '../../../../shared/enums/roles';
import {ENTITY_REGISTRY} from '../../../../shared/consts/entity-registry';
import {BaseEntityDialogComponent} from '../entity-dialog/base-entity-dialog.component';

@Component({
  selector: 'app-base-entity-page',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
export class BaseEntityPageComponent<T extends { _name: string; }, U> implements OnInit, OnDestroy {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected configService!: BaseConfigService;
  protected dialogService!: BaseDialogService<T, U, BaseEntityDialogComponent<T>>;

  entity = signal<T | undefined>(undefined);

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit() {
    this.updateTabLinks();
    // this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }


  initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService?.dialogUpdateEvent();
      // if (updated) untracked(() => {
      //   this.handleDialogUpdate(updated);
      // });
      if (updated) {
        this.handleDialogUpdate(updated);
      }
    });
  }

  handleDialogUpdate(updated: { mode: DialogMode | string, entity?: T }) {
    this.updateTabLinks(updated.entity);
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
    // this.removeFragmentUrl();
  }

 // removeFragmentUrl() {
 //    this.router.navigate([], {
 //      relativeTo: this.activatedRoute,
 //      queryParamsHandling: 'preserve',
 //      fragment: undefined
 //    }).then();
 //  }

  // private handleDialogUrlFragment() {
  //   this.activatedRoute.fragment
  //     .pipe(takeUntil(this._destroy$))
  //     .subscribe(fragment => {
  //       if (fragment) this.dialogService.processUrlFragment(fragment);
  //     });
  // }

  navigateOnUpdateSuccess(entity: T) {
    this.router.navigate(['../', entity._name], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      // fragment: undefined
    }).then();
  }
  //
  navigateOnDeleteSuccess() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      // fragment: undefined
    }).then();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTabLinks(_entity?: T) {
    return;
  }
}
