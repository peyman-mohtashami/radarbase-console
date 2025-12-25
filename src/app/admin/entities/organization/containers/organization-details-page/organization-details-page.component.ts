import {Component, effect, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {OrganizationDetailsComponent} from "../../components/organization-details/organization-details.component";
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Component({
  selector: 'app-organization-details-page',
  templateUrl: './organization-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    OrganizationDetailsComponent
  ]
})
export class OrganizationDetailsPageComponent {
  private configService = inject(OrganizationConfigService);
  private dialogService = inject(OrganizationDialogService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  entity = this.selectedEntitiesService.selectedOrganization;
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
