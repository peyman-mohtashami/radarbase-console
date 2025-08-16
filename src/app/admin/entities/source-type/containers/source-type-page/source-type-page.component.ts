import { Component } from '@angular/core';
import {Location, NgIf} from '@angular/common';
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
  StaticBreadcrumbComponent
} from "../../../../components/base-entity-page/static-breadcrumb/static-breadcrumb.component";
import {
  DetailsPageHeaderComponent
} from "../../../../components/base-details/details-page-header/details-page-header.component";
import {SourceTypeDetailsComponent} from "../../components/source-type-details/source-type-details.component";
import {SourceTypeService} from "../../services/sourceType.service";

@Component({
  selector: 'rb-source-type-page',
  templateUrl: './source-type-page.component.html',
  imports: [
    LoaderComponent,
    NgIf,
    TranslatePipe,
    StaticBreadcrumbComponent,
    DetailsPageHeaderComponent,
    SourceTypeDetailsComponent
  ]
})
export class SourceTypePageComponent extends BaseEntityPage<
  AppSourceType,
  SourceTypeDialogComponent
> {
  protected readonly ENTITY_NAME = ENTITY_NAME;

  constructor(
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    entityService: SourceTypeService, //SourceTypeEntityService
  ) {
    super(router, activatedRoute, dialog, location, entityService);
  }

  override getDialogRef(
    mode: DialogMode,
    entity: AppSourceType
  ): MatDialogRef<SourceTypeDialogComponent> {
    return this.dialog.open(SourceTypeDialogComponent, {
      data: { mode, entity },
      panelClass: ['w-full', 'sm:w-1/2'],
      disableClose: true,
    });
  }

  override navigateOnUpdateSuccess(entity: AppSourceType) {
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

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-types']).then();
  }
}
