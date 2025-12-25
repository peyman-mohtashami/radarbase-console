 import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {AppProject} from '../../../project/models/project';
import {SubjectService} from '../../services/subject.service';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {AppSubject, RadarSubject} from '../../models/subject';
import {SubjectTableRowComponent} from '../../components/subject-table-row/subject-table-row.component';
import {
  DataTableFilterComponent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {ListPageHeaderComponent} from '../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {BaseEntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {SubjectAssignGroupComponent} from '../../components/subject-assign-group/subject-assign-group.component';

@Component({
  selector: 'app-subject-list-page',
  templateUrl: './subject-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    ListPageHeaderComponent,
    LoaderComponent,
    SubjectTableRowComponent,
    EntityListPageComponent,
    SubjectAssignGroupComponent,
  ]
})
export class SubjectListPageComponent extends BaseEntityListPageComponent<AppSubject, RadarSubject> implements OnInit, OnDestroy {
  override entityService = inject(SubjectService);
  override configService = inject(SubjectConfigService);
  override dialogService = inject(SubjectDialogService);

  override entities = signal<AppSubject[]>(this.activatedRoute.snapshot.data['subjectList']);

  project: AppProject = this.selectedEntitiesService.selectedProject()!;

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.project?.projectName);
  }

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}


