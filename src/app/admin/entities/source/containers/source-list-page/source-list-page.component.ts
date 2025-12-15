import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {SourceService} from '../../services/source.service';
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {AppSource} from '../../models/source';
import {SourceTableRowComponent} from '../../components/source-table-row/source-table-row.component';
import {AppSourceType} from '../../../source-type/models/source-type';
import {AppProject} from '../../../project/models/project';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';

@Component({
  selector: 'app-source-list-page',
  templateUrl: './source-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    EntitiesPageHeaderComponent,
    LoaderComponent,
    SourceTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class SourceListPageComponent extends BaseEntityListPageComponent<AppSource> implements OnInit, OnDestroy {
  override entityService = inject(SourceService);
  override configService = inject(SourceConfigService);
  override dialogService = inject(SourceDialogService);

  sourceTypes: AppSourceType[] = [];

  project: AppProject = this.activatedRoute.parent?.parent?.snapshot.data['entity'];

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.project.projectName);
  }

  ngOnInit() {
    if (!this.project) throw new Error('Project not found');
    this.sourceTypes = this.project.sourceTypes?.map(s => ({
      ...s,
      _name: `${s.producer}/${s.model}/${s.catalogVersion}`,
      _search: `${s.producer}/${s.model}/${s.catalogVersion}`
    })) ?? [];
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getDialogData(entity?: AppSource) {
    return {
      entity: entity,
      entities: this.entities(),
      sourceTypes: this.sourceTypes
    }
  }
}
