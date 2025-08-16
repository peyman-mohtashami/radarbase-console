import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { FilterItem, TableType } from '../../../../models/table.model';
import { RevisionService } from '../../services/revision.service';
import { AppRevision } from "../../models/revision";
import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";

@Component({
    selector: 'rb-subjects-revisions-page',
    templateUrl: './subject-revisions-page.component.html',
})
export class SubjectRevisionsPageComponent
  extends BaseEntitiesPage<AppRevision, never>
  implements OnInit, OnDestroy
{
  override type = TableType.GET_WITH_QUERY;

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
    // super.ngOnInit();
  }

  ngOnDestroy() {
    this.destroy();
    // super.ngOnDestroy();
  }

  override getTotal(): number {
    return this.entityService.getTotal();
  }

  override getWithQuery(params: Params): Observable<AppRevision[]> {
    return this.entityService.getWithQuery(params);
  }
}
