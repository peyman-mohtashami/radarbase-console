import {Component, effect, inject,} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {ProjectConfigService} from '../../services/project-config.service';
import {SelectedEntitiesService} from '../../../../../services/selected-entities.service';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {ProjectDialogService} from '../../services/project-dialog.service';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    ProjectDetailsComponent,
  ]
})
export class ProjectDetailsPageComponent {
  private configService = inject(ProjectConfigService);
  private selectedEntitiesService = inject(SelectedEntitiesService);
  private dialogService = inject(ProjectDialogService);

  entity = this.selectedEntitiesService.selectedProject;
  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated.entity) {
              this.entity.set(updated.entity);
            }
            break;
        }
      }
    });
  }
}
