import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { DialogMode } from '../../../../enums/dialog';
import { AppSourceType } from "../../models/source-type";
import {TranslatePipe} from "@ngx-translate/core";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {SourceTypeDetailsComponent} from '../../components/source-type-details/source-type-details.component';
import {ActionsComponent} from '../../components/actions/actions.component';
import {SourceTypeConfigService} from '../../services/source-type-config.service';

@Component({
  selector: 'app-source-type-page',
  templateUrl: './source-type-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    TranslatePipe,
    MatPrefix,
    SourceTypeDetailsComponent,
    ActionsComponent
  ]
})
export class SourceTypePageComponent implements OnInit, OnDestroy {
  protected configService = inject(SourceTypeConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(SourceTypeDialogService);

  protected readonly DialogMode = DialogMode;

  entityName = this.configService.getEntityMetadata().name;

  entity = signal<AppSourceType>(this.activatedRoute.snapshot.data['sourceType']);
  sourceTypeFullList = this.activatedRoute.snapshot.data['sourceTypeListFullList'];

  tableFields = this.configService.getTableFields();

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
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
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
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
    const [, action, entityType] = fragment.split('/');
    if (entityType === this.entityName) {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity());
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, this.entity());
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
