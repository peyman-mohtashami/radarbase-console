import {Component, effect, inject, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppOrganization } from "../../models/organization";
import {MatCard, MatCardContent} from "@angular/material/card";
import {OrganizationDetailsComponent} from "../../components/organization-details/organization-details.component";
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {DialogMode} from '../../../../enums/dialog';

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
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(OrganizationConfigService);
  private dialogService = inject(OrganizationDialogService);

  entity = signal(this.activatedRoute.snapshot.parent?.data['organization'] as AppOrganization);
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
