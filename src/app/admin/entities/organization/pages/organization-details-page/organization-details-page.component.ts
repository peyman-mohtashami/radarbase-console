import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {OrganizationDetailsComponent} from "../../components/organization-details/organization-details.component";
import {OrganizationStore} from '../../services/organization.store';

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
  protected store = inject(OrganizationStore);
}
