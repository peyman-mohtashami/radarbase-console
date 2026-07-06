import {Component, effect, inject, signal} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {OrganizationDetailsComponent} from "../../components/organization-details/organization-details.component";
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {findRouteData} from '../../services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {AppOrganization} from '../../models/organization';

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
  private activatedRoute = inject(ActivatedRoute);

  entity = signal<AppOrganization>(findRouteData(this.activatedRoute, 'organization'));
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
