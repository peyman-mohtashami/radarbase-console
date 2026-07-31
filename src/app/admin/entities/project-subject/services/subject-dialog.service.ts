import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppSubject} from '../models/subject';
import {AppProject} from '../../project/models/project';
import {SubjectDialogMode} from '../enums/dialog';
import {SubjectConfigService} from './subject-config.service';
import {ProjectStore} from '../../project/services/project.store';
import {
  StoredSubjectDialog,
  SubjectDialogComponent,
  SubjectForm
} from '../dialogs/subject-dialog/subject-dialog.component';
import {
  SubjectDialogDiscontinueComponent
} from '../dialogs/subject-dialog-discontinue/subject-dialog-discontinue.component';
import {
  SubjectDialogPairSourceComponent
} from '../dialogs/subject-dialog-pair-source/subject-dialog-pair-source.component';
import {
  PairAppForm,
  SubjectDialogPairAppComponent
} from '../dialogs/subject-dialog-pair-app/subject-dialog-pair-app.component';
import {
  SubjectDialogAssignGroupComponent
} from '../dialogs/subject-dialog-assign-group/subject-dialog-assign-group.component';
import {ClientStore} from '../../client/services/client.store';
import {GroupStore} from '../../project-group/services/group.store';
import {SourceStore} from '../../project-source/services/source.store';

@Injectable({providedIn: 'root'})
export class SubjectDialogService {
  private projectStore = inject(ProjectStore);
  private groupStore = inject(GroupStore);
  private sourceStore = inject(SourceStore);
  private clientStore = inject(ClientStore);
  private configService = inject(SubjectConfigService);
  private dialog = inject(MatDialog);


  async openDialog(mode: SubjectDialogMode, entity?: AppSubject, restoredModel?: SubjectForm) {
    if (mode !== SubjectDialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async openPairAppDialog(mode: SubjectDialogMode, entity: AppSubject, restoredModel?: PairAppForm) {
    await this.createPairAppDialogRef(mode, entity, restoredModel);
  }

  async openPairSourceDialog(mode: SubjectDialogMode, entity: AppSubject) {
    await this.createPairSourceDialogRef(mode, entity);
  }

  async openAssignGroupToSubjectsDialog(subjects: { login: string; }[]) {
    await this.createAssignGroupToSubjectsDialogRef(subjects);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredSubjectDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: SubjectDialogMode, entity?: AppSubject, restoredModel?: SubjectForm):
    Promise<MatDialogRef<SubjectDialogComponent | SubjectDialogDiscontinueComponent>> {
    const project = this.projectStore.selected()!;

    if (this.groupStore.items().length === 0) {
      await this.groupStore.getAll();
    }
    const groupFullList = this.groupStore.items();

    const _data = {id: 'subject-dialog', mode, entity, project, groupFullList, restoredModel};

    switch (mode) {
      case SubjectDialogMode.DISCONTINUE:
        return this.createDiscontinueDialogRef(_data);
      case SubjectDialogMode.DELETE:
        return this.dialog.open(SubjectDialogComponent, {
          id: 'subject-dialog',
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SubjectDialogComponent, {
          id: 'subject-dialog',
          data: _data,
          panelClass: 'tailwind-slide-panel',
          width: '50%',
          height: '100vh',
          position: {right: '0'},
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
    }
  }

  createDiscontinueDialogRef(data: {
    mode: SubjectDialogMode,
    entity?: AppSubject,
    project?: AppProject
  }): MatDialogRef<SubjectDialogDiscontinueComponent> {
    const _data = {id: 'subject-discontinue-dialog', mode: data.mode, entity: data.entity, project: data.project};

    return this.dialog.open(SubjectDialogDiscontinueComponent, {
      id: 'subject-discontinue-dialog',
      data: _data,
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  async createPairAppDialogRef(mode: SubjectDialogMode, entity?: AppSubject, restoredModel?: PairAppForm) {
    if (!entity) return;

    const project = this.projectStore.selected()!;

    if (!this.clientStore.items().length) {
      await this.clientStore.getAll();
    }
    const clientFullList = this.clientStore.items().filter(c => c.additionalInformation?.['dynamic_registration'] && c.additionalInformation?.['dynamic_registration'] === 'true')

    const _data = {id: 'subject-pair-app-dialog', mode, entity, project, clientFullList, restoredModel};

    return this.dialog.open(SubjectDialogPairAppComponent, {
      id: 'subject-pair-app-dialog',
      data: _data,
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: {right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  async createPairSourceDialogRef(mode: SubjectDialogMode, entity?: AppSubject) {
    if (!entity) return;

    const project = this.projectStore.selected()!;

    if (!this.sourceStore.items().length) {
      await this.sourceStore.getWithQuery();
    }
    const sourcesFullList = this.sourceStore.items().filter(s => !s.assigned);

    const _data = {id: 'subject-pair-source-dialog', mode, entity, project, sourcesFullList};

    return this.dialog.open(SubjectDialogPairSourceComponent, {
      id: 'subject-pair-source-dialog',
      data: {..._data, sourcesFullList},
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: {right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  async createAssignGroupToSubjectsDialogRef(selectedSubjects: { login: string; }[] = []) {
    if (this.groupStore.items().length === 0) {
      await this.groupStore.getAll();
    }
    const groupFullList = this.groupStore.items();

    const _data = {id: 'subject-assign-group-dialog', groupFullList, selectedSubjects};

    return this.dialog.open(SubjectDialogAssignGroupComponent, {
      id: 'subject-assign-group-dialog',
      data: _data,
      panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}


