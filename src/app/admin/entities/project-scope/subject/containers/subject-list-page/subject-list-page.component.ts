 import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {AppProject} from '../../../../main-scope/project/models/project';
import {SubjectService} from '../../services/subject.service';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {AppSubject, RadarSubject} from '../../models/subject';
import {SubjectTableRowComponent} from '../../components/subject-table-row/subject-table-row.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {SubjectAssignGroupComponent} from '../../components/subject-assign-group/subject-assign-group.component';
 import {MatButton, MatIconButton} from '@angular/material/button';
 import {MatIcon} from '@angular/material/icon';
 import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
 import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-subject-list-page',
  templateUrl: './subject-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    SubjectTableRowComponent,
    EntityListPageComponent,
    SubjectAssignGroupComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SubjectListPageComponent extends BaseEntityListPageComponent<AppSubject, RadarSubject> {
  override entityService = inject(SubjectService);
  override configService = inject(SubjectConfigService);
  override dialogService = inject(SubjectDialogService);

  override entities = signal<AppSubject[]>(this.activatedRoute.snapshot.data['subjectList']);

  project: AppProject = this.selectedEntitiesService.getSelected().project()!;

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.project?.projectName);
  }
}


