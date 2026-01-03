import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {SourceService} from '../../services/source.service';
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {AppSource, RadarSource} from '../../models/source';
import {SourceTableRowComponent} from '../../components/source-table-row/source-table-row.component';
import {AppSourceType} from '../../../../main-scope/source-type/models/source-type';
import {AppProject} from '../../../../main-scope/project/models/project';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';

@Component({
  selector: 'app-source-list-page',
  templateUrl: './source-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    ListPageHeaderComponent,
    LoaderComponent,
    SourceTableRowComponent,
    EntityListPageComponent,
  ]
})
export class SourceListPageComponent extends BaseEntityListPageComponent<AppSource, RadarSource> {
  override entityService = inject(SourceService);
  override configService = inject(SourceConfigService);
  override dialogService = inject(SourceDialogService);

  override entities = signal<AppSource[]>(this.activatedRoute.snapshot.data['sourceList']);
  project?: AppProject = this.selectedEntitiesService.getSelected().project();

  sourceTypes: AppSourceType[] = [];


  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.project?.projectName);
  }

  override ngOnInit() {
    if (!this.project) throw new Error('Project not found');
    this.sourceTypes = this.project.sourceTypes?.map(s => ({
      ...s,
      _name: `${s.producer}/${s.model}/${s.catalogVersion}`,
      _search: `${s.producer}/${s.model}/${s.catalogVersion}`
    })) ?? [];
    super.ngOnInit();
  }
}
