import {Component, effect, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
import {BackButtonDirective} from '../../../../directives/back-button.directive';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';

@Component({
  selector: 'rb-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    SourceDataDetailsComponent,
    MatCard,
    MatCardContent,
    ActionsComponent,
    BackButtonDirective,
    MatButton,
    TranslatePipe,
    RouterLink,
    MatPrefix
  ]
})
export class SourceDataPageComponent implements OnInit, OnDestroy {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;

  entity$: WritableSignal<AppSourceData>;
  sourceTypes: AppSourceType[];

  _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: SourceDataDialogService,
  ) {
    this.entity$ = signal(this.activatedRoute.snapshot.data['entity']);
    this.sourceTypes = this.activatedRoute.snapshot.data['sourceTypes'];

    effect(() => {
      const updated = this.dialogService.updateTrigger$();
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

  ngOnInit(): void {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (!fragment) return;

        const fragmentItems = fragment.split('/');

        const actionType = fragmentItems[1];
        const actionEntity = fragmentItems[2];

        if (actionEntity === ENTITY_NAME.sourceData) {
          if (actionType === 'edit') {
            this.dialogService.openDialog(DialogMode.EDIT, this.entity$(), {sourceTypes: this.sourceTypes});
          } else if (actionType === 'delete') {
            this.dialogService.openDialog(DialogMode.DELETE, this.entity$(), {sourceTypes: this.sourceTypes});
          }
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
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
