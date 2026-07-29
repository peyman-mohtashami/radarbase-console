import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SourceDataService} from './source-data.service';
import {AppSourceData, SourceDataDto} from '../models/source-data';
import {BaseDialogService} from '../../../base-entities/services/base-dialog.service';
import {SourceDataConfigService} from './source-data-config.service';
import {SourceTypeService} from '../../source-type/services/source-type.service';
import {ProjectStore} from '../../project/services/project.store';
import {ClientStore} from '../../client/services/client.store';
import {OrganizationStore} from '../../organization/services/organization.store';
import {SourceTypeStore} from '../../source-type/services/source-type.store';
import {ActivatedRoute} from '@angular/router';
import {SourceDataDialogComponent} from '../dialogs/source-data-dialog/source-data-dialog.component';
import {GroupStore} from '../../project-group/services/group.store';
import {SourceStore} from '../../project-source/services/source.store';
import {SubjectConfigService} from '../../project-subject/services/subject-config.service';

@Injectable({providedIn: 'root'})
export class SourceDataDialogService {
  private store = inject(ClientStore);
  private projectStore = inject(ProjectStore);
  private groupStore = inject(GroupStore);
  private sourceStore = inject(SourceStore);
  private clientStore = inject(ClientStore);
  private organizationStore = inject(OrganizationStore);
  private sourceTypeStore = inject(SourceTypeStore);
  private configService = inject(SubjectConfigService);
  private dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);

  sourceTypeService = inject(SourceTypeService);

  async openDialog(mode: DialogMode, entity?: AppSourceData) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppSourceData): Promise<MatDialogRef<SourceDataDialogComponent>> {
    const sourceTypeFullList = this.sourceTypeStore.items();//this.sourceTypeService.getWithQuery();
    const _data = {id: 'source-data-dialog', mode, entity, sourceTypeFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(SourceDataDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(SourceDataDialogComponent, {
          id: 'source-data-dialog',
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
}
