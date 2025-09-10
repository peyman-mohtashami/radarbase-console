import {Component, OnDestroy, OnInit} from '@angular/core';
import {JsonPipe, Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SourceTypeDialogComponent } from '../source-type-dialog/source-type-dialog.component';
import { DialogMode } from '../../../../enums/dialog';
import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
import { AppSourceType } from "../../models/source-type";
import { ENTITY_NAME } from '../../../../enums/entities';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {
  DetailsPageHeaderComponent
} from "../../../../components/base-details/details-page-header/details-page-header.component";
import {SourceTypeDetailsComponent} from "../../components/source-type-details/source-type-details.component";
import {SourceTypeService} from "../../services/sourceType.service";
import {BreadcrumbComponent} from '../../../../components/breadcrumb/breadcrumb.component';
import {Subject} from 'rxjs';
import {IBaseEntityService} from '../../../../services/base-entity.service.interface';
import {takeUntil} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';

@Component({
  selector: 'rb-source-type-page',
  templateUrl: './source-type-page.component.html',
  imports: [
    LoaderComponent,
    TranslatePipe,
    DetailsPageHeaderComponent,
    SourceTypeDetailsComponent,
    BreadcrumbComponent,
    JsonPipe
  ]
})
export class SourceTypePageComponent implements OnInit, OnDestroy {
//   extends
// } BaseEntityPage<
//   AppSourceType,
//   SourceTypeDialogComponent
// > {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  entity: AppSourceType; // = this.activatedRoute.snapshot.data['entity'];
  name: string = '';
  loading = false;
  error?: string;
  _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private entityDialogService: SourceTypeDialogService, //SourceTypeEntityService
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

        if (actionEntity === ENTITY_NAME.sourceType) {
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

  onAction(mode: DialogMode, entity: AppSourceType): void {
    return this.entityDialogService.openDialog(mode, entity);
  }

  // onUpdateSuccess(entity: T, dialogRef: MatDialogRef<U>): void {
  //   this.entity = entity;
  //   this.navigateOnUpdateSuccess(entity);
  //   dialogRef.close();
  // }
  //
  // onError(error: HttpErrorResponse, dialogRef: MatDialogRef<U>) {
  //   dialogRef.componentInstance.errorHappened(error);
  // }

  onBack() {
    this.location.back();
  }


  navigateOnUpdateSuccess(entity: AppSourceType) {
    //! name
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
