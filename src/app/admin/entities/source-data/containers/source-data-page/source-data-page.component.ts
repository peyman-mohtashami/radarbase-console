import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSourceData} from "../../models/source-data";

import {ENTITY_NAME} from '../../../../enums/entities';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {SourceDataDetailsComponent} from "../../components/source-data-details/source-data-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BreadcrumbComponent} from '../../../../components/breadcrumb/breadcrumb.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ActionsComponent} from '../../components/actions/actions.component';
import {ENTITIES} from '../../../../consts/entities';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';

@Component({
  selector: 'rb-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    LoaderComponent,
    SourceDataDetailsComponent,
    TranslatePipe,
    BreadcrumbComponent,
    MatCard,
    MatCardContent,
    ActionsComponent
  ]
})
export class SourceDataPageComponent implements OnInit, OnDestroy {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;

  entity: AppSourceData;

  _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private entityDialogService: SourceDataDialogService,
  ) {
    this.entity = this.activatedRoute.snapshot.data['entity'];
  }

  ngOnInit(): void {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (!fragment) return;

        const fragmentItems = fragment.split('/');

        const actionType = fragmentItems[1];
        const actionEntity = fragmentItems[2];
        const actionId = fragmentItems[3];

        if (actionEntity === ENTITY_NAME.sourceData) {
          if (actionType === 'edit') {
            this.entityDialogService.openDialog(DialogMode.EDIT, this.entity);
          } else if (actionType === 'delete') {
            this.entityDialogService.openDialog(DialogMode.DELETE, this.entity);
          }
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onAction(mode: DialogMode, entity: AppSourceData): void {
    return this.entityDialogService.openDialog(mode, entity);
  }

  navigateOnUpdateSuccess(entity: AppSourceData) {
    this.router
      .navigate(['/admin', 'source-data', entity.sourceDataName])
      .then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-data']).then();
  }

  onBack() {
    this.location.back();
  }
}
