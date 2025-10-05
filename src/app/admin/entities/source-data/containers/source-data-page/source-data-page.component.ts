import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSourceData} from "../../models/source-data";

import {ENTITY_NAME} from '../../../../enums/entities';
import {SourceDataDetailsComponent} from "../../components/source-data-details/source-data-details.component";
import {MatCard, MatCardContent} from '@angular/material/card';
import {ActionsComponent} from '../../components/actions/actions.component';
import {ENTITIES} from '../../../../consts/entities';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {AppSourceType} from '../../../source-type/models/source-type';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {SourceDataConfigService} from '../../services/source-data-config.service';

@Component({
  selector: 'rb-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    SourceDataDetailsComponent,
    MatCard,
    MatCardContent,
    ActionsComponent,
    TranslatePipe,
    MatPrefix
  ]
})
export class SourceDataPageComponent implements OnInit, OnDestroy {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;

  private configService = inject(SourceDataConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(SourceDataDialogService);

  entity$ = signal<AppSourceData>(this.activatedRoute.snapshot.data['entity']);
  tableFields = this.configService.getTableFields();
  sourceTypes: AppSourceType[] = this.activatedRoute.snapshot.data['sourceTypes'];

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
    if (entityType === 'sourceData') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity$(), this.sourceTypes);
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, this.entity$(), this.sourceTypes);
          break;
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppSourceData) {
    this.router
      .navigate(['/admin', 'source-data', entity.sourceDataName])
      .then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-data']).then();
  }
}
