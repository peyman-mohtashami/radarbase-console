import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {SourceDataDialogComponent} from '../source-data-dialog/source-data-dialog.component';
import {SourceDataService} from '../../services/source-data.service';
import {BaseEntityPage} from '../../../../components/base-entity-page/base-entity-page';
import {AppSourceData} from "../../models/source-data";
import {AppSourceType} from "../../../source-type/models/source-type";
import {ENTITY_NAME} from '../../../../enums/entities';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {SourceDataDetailsComponent} from "../../components/source-data-details/source-data-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BreadcrumbComponent} from '../../../../components/breadcrumb/breadcrumb.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ActionsComponent} from '../../components/actions/actions.component';
import {ENTITIES} from '../../../../consts/entities';

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
export class SourceDataPageComponent extends BaseEntityPage<
  AppSourceData,
  SourceDataDialogComponent
> implements OnInit {

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;

  override name = ENTITY_NAME.sourceData;
  sourceTypes: AppSourceType[] = this.activatedRoute.snapshot.data['sourceTypes'];

  constructor(
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    entityService: SourceDataService
  ) {
    super(router, activatedRoute, dialog, location, entityService);
  }

  ngOnInit() {
    this.init()
  }

  override navigateOnUpdateSuccess(entity: AppSourceData) {
    this.router
      .navigate(['/admin', 'source-data', entity.sourceDataName])
      .then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-data']).then();
  }

}
