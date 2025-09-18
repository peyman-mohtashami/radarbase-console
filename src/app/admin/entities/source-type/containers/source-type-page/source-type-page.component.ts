import {Component, effect, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import { DialogMode } from '../../../../enums/dialog';
import { AppSourceType } from "../../models/source-type";
import { ENTITY_NAME } from '../../../../enums/entities';
import {TranslatePipe} from "@ngx-translate/core";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {ENTITIES} from '../../../../consts/entities';
import {BackButtonDirective} from '../../../../directives/back-button.directive';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {SourceTypeDetailsComponent} from '../../components/source-type-details/source-type-details.component';
import {ActionsComponent} from '../../components/actions/actions.component';

@Component({
  selector: 'rb-source-type-page',
  templateUrl: './source-type-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    BackButtonDirective,
    MatButton,
    TranslatePipe,
    RouterLink,
    MatPrefix,
    SourceTypeDetailsComponent,
    ActionsComponent
  ]
})
export class SourceTypePageComponent implements OnInit, OnDestroy {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;

  entity$: WritableSignal<AppSourceType>;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: SourceTypeDialogService,
  ) {
    this.entity$ = signal(this.activatedRoute.snapshot.data['entity']);
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity$.set(updated.entity);
            }
            this.navigateOnUpdateSuccess(updated.entity);
            break;
          case DialogMode.DELETE:
            this.navigateOnDeleteSuccess();
            break;
        }
      }
    })
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType] = fragment.split('/');
    if (entityType === 'sourceType') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity$());
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, this.entity$());
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppSourceType) {
    this.router
      .navigate([
        '/admin',
        'source-types',
        entity.producer,
        entity.model,
        entity.catalogVersion,
      ])
      .then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-types']).then();
  }
}
