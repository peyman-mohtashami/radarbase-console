import {Component, effect, inject, signal,} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {ProjectConfigService} from '../../services/project-config.service';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {findRouteData} from '../../../organization/services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {AppProject} from '../../models/project';

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
  private dialogService = inject(ProjectDialogService);
  private activatedRoute = inject(ActivatedRoute);

  entity = signal<AppProject>(findRouteData(this.activatedRoute, 'project'));
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
