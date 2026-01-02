import {Component, inject, signal} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {RevisionService} from '../../services/revision.service';
import {RevisionConfigService} from '../../services/revision-config.service';
import {AppRevision, RadarRevision} from '../../models/revision';
import {RevisionTableRowComponent} from '../../components/revision-table-row/revision-table-row.component';
import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';

@Component({
  selector: 'app-revision-list-page',
  templateUrl: './revision-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TranslatePipe,
    RevisionTableRowComponent,
    TagComponent,
    EntityListPageComponent,
  ]
})
export class RevisionListPageComponent extends BaseEntityListPageComponent<AppRevision, RadarRevision> {
  override entityService = inject(RevisionService);
  override configService = inject(RevisionConfigService);

  override entities = signal<AppRevision[]>(this.activatedRoute.snapshot.data['revisionList']);
}
