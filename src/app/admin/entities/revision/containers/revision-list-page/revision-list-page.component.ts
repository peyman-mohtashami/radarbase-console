import {Component, OnDestroy, OnInit, inject, signal} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {RevisionService} from '../../services/revision.service';
import {RevisionConfigService} from '../../services/revision-config.service';
import {AppRevision} from '../../models/revision';
import {RevisionTableRowComponent} from '../../components/revision-table-row/revision-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';

@Component({
  selector: 'app-revision-list-page',
  templateUrl: './revision-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TranslatePipe,
    RevisionTableRowComponent,
    TagComponent,
    EntitiesPageComponent,
  ]
})
export class RevisionListPageComponent extends BaseEntityListPageComponent<AppRevision> implements OnInit, OnDestroy {
  override entityService = inject(RevisionService);
  override configService = inject(RevisionConfigService);

  override entities = signal<AppRevision[]>(this.activatedRoute.snapshot.data['revisionList']);

  ngOnInit() {}

  ngOnDestroy() {
    super.destroy();
  }
}
