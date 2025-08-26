import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SourceDataDialogComponent } from '../source-data-dialog/source-data-dialog.component';
import { SourceDataService } from '../../services/source-data.service';
import { DialogMode } from '../../../../enums/dialog';
import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
import { AppSourceData } from "../../models/source-data";
import { AppSourceType } from "../../../source-type/models/source-type";
import { ENTITY_NAME } from '../../../../enums/entities';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {
  DetailsPageHeaderComponent
} from "../../../../components/base-details/details-page-header/details-page-header.component";
import {SourceDataDetailsComponent} from "../../components/source-data-details/source-data-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BreadcrumbComponent} from '../../../../components/breadcrumb/breadcrumb.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem} from '@angular/material/menu';
import {RbPermissionDirective} from '../../../../../core/auth/directives/ng-permission.directive';
import {Actions} from '../../components/actions/actions';
import {ENTITIES} from '../../../../consts/entities';

@Component({
  selector: 'rb-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    LoaderComponent,
    DetailsPageHeaderComponent,
    SourceDataDetailsComponent,
    TranslatePipe,
    BreadcrumbComponent,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    RbPermissionDirective,
    Actions
  ]
})
export class SourceDataPageComponent extends BaseEntityPage<
  AppSourceData,
  SourceDataDialogComponent
> {
  protected readonly ENTITY_NAME = ENTITY_NAME;

  sourceTypes: AppSourceType[] =
    this.activatedRoute.snapshot.data['sourceTypes'];

  constructor(
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    entityService: SourceDataService
  ) {
    super(router, activatedRoute, dialog, location, entityService);
  }

  override getDialogRef(
    mode: DialogMode,
    entity: AppSourceData
  ): MatDialogRef<SourceDataDialogComponent> {

    return this.dialog.open(SourceDataDialogComponent,
      {
        data: { mode, entity, sourceTypes: this.sourceTypes}, //entities: this.entities },
        panelClass: 'tailwind-slide-panel',
        width: '50%',
        height: '100vh',
        position: { right: '0' },
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        restoreFocus: false
      }
    // {
    //   data: { mode, entity, sourceTypes: this.sourceTypes },
    //   panelClass: ['w-full', 'sm:w-1/2'],
    //   disableClose: true,
    // }
    );
  }

  override navigateOnUpdateSuccess(entity: AppSourceData) {
    this.router
      .navigate(['/admin', 'source-data', entity.sourceDataName])
      .then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-data']).then();
  }

  protected readonly ENTITIES = ENTITIES;
}
