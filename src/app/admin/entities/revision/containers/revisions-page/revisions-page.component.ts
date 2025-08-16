import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { FilterItem, TableType } from "../../../../models/table.model";
import { RevisionService } from '../../services/revision.service';
import { AppRevision } from "../../models/revision";
import { TABLE_ANIMATION } from "../../../../animation";
import { PROPERTIES} from "../../config";
import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
import {ENTITY_NAME} from "../../../../enums/entities";
import {
  EntitiesPageHeaderComponent
} from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
import {TagComponent} from "../../../../components/tag/tag.component";
import {
  DataTableFilterComponent
} from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {RevisionTableRowComponent} from "../../components/revision-table-row/revision-table-row.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'rb-revisions-list',
  templateUrl: './revisions-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    TagComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    NgIf,
    RevisionTableRowComponent,
    MatPaginator
  ]
})
export class RevisionsPageComponent
  extends BaseEntitiesPage<AppRevision, never>
  implements OnInit, OnDestroy
{
  name = ENTITY_NAME.revision;
  override type = TableType.GET_WITH_QUERY;
  protected readonly PROPERTIES = PROPERTIES;

  override filters: FilterItem[] = [];


  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    entityService: RevisionService
  ) {
    super(router, activatedRoute, dialog, entityService);
  }

  ngOnInit(): void {
    this.init();
  }
  ngOnDestroy(): void {
    this.destroy();
  }
}
