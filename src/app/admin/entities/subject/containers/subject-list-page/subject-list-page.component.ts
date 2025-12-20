import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {AppSourceType} from '../../../source-type/models/source-type';
import {AppProject} from '../../../project/models/project';
import {SubjectService} from '../../services/subject.service';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {AppSubject} from '../../models/subject';
import {SubjectTableRowComponent} from '../../components/subject-table-row/subject-table-row.component';
import {SubjectDialogMode} from '../../enums/dialog';
import {AppGroup} from '../../../group/models/group';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {getCurrentProject} from '../../../../services/util';
import {SubjectAssignGroupComponent} from '../../components/subject-assign-group/subject-assign-group.component';

@Component({
  selector: 'app-subject-list-page',
  templateUrl: './subject-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    EntitiesPageHeaderComponent,
    LoaderComponent,
    SubjectTableRowComponent,
    EntitiesPageComponent,
    SubjectAssignGroupComponent,
  ]
})
export class SubjectListPageComponent extends BaseEntityListPageComponent<AppSubject> implements OnInit, OnDestroy {
  override entityService = inject(SubjectService);
  override configService = inject(SubjectConfigService);
  override dialogService = inject(SubjectDialogService);

  sourceTypes: AppSourceType[] = [];

  override entities = signal<AppSubject[]>(this.activatedRoute.snapshot.data['subjectList']);
  groups: AppGroup[] = this.activatedRoute.snapshot.data['groupFullList'];

  project: AppProject = getCurrentProject(this.activatedRoute.snapshot)!;

  // actionMapper: Record<string, SubjectDialogMode> = {
  //   'add': SubjectDialogMode.ADD,
  //   'edit': SubjectDialogMode.EDIT,
  //   'delete': SubjectDialogMode.DELETE,
  //   'discontinue': SubjectDialogMode.DISCONTINUE,
  //   'pair_app': SubjectDialogMode.PAIR_APP,
  //   'pair_source': SubjectDialogMode.PAIR_SOURCE,
  // }

  override handleDialogUpdate(updated: { mode: SubjectDialogMode, entity?: AppSubject }) {
    switch (updated.mode) {
      case SubjectDialogMode.ADD:
        this.addEntityToView(updated.entity);
        break;
      case SubjectDialogMode.EDIT:
        this.refreshEntities();
        break;
      case SubjectDialogMode.DISCONTINUE:
        this.refreshEntities();
        break;
      case SubjectDialogMode.PAIR_APP:
        this.refreshEntities();
        break;
      case SubjectDialogMode.PAIR_SOURCE:
        this.refreshEntities();
        break;
      case SubjectDialogMode.DELETE:
        this.refreshEntities();
        break;
      case SubjectDialogMode.ASSIGN_GROUP:
        this.refreshEntities();
        break;
    }
    this.removeFragmentUrl();
    this.loading.set(false);
    this.selection.clear();
  }

  // override processUrlFragment(fragment: string) {
  //   console.log('Class: SubjectListPageComponent, Function: processUrlFragment, Line 82 fragment' , fragment);
  //   const entityMetadata = this.configService.getEntityMetadata()
  //   const [, action, entityType, entityId] = fragment.split('/');
  //   if (entityType === entityMetadata.name) {
  //     const entity = this.entities().find(e => e._name == entityId);
  //     switch (action) {
  //       case 'add':
  //         this.dialogService.openDialog(SubjectDialogMode.ADD, this.getDialogData(entity));
  //         break;
  //       case 'edit':
  //         if (entity) this.dialogService.openDialog(SubjectDialogMode.EDIT, this.getDialogData(entity));
  //         break;
  //       case 'delete':
  //         if (entity) this.dialogService.openDialog(SubjectDialogMode.DELETE, this.getDialogData(entity));
  //         break;
  //       case 'discontinue':
  //         if (entity) this.dialogService.openDialog(SubjectDialogMode.DISCONTINUE, this.getDialogData(entity));
  //         break;
  //       case 'pair_source':
  //         if (entity) this.dialogService.openDialog(SubjectDialogMode.PAIR_SOURCE, this.getDialogData(entity));
  //         break;
  //       case 'pair_app':
  //         if (entity) this.dialogService.openDialog(SubjectDialogMode.PAIR_APP, this.getDialogData(entity));
  //         break;
  //     }
  //   }
  // }

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.project?.projectName);
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

  override getDialogData(entity?: AppSubject) {
    return {
      entity: entity,
      entities: this.entities(),
      project: this.project,
      groups: this.groups
    }
  }
}


