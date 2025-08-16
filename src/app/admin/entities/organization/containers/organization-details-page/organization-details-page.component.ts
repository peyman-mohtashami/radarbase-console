import {Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppOrganization } from "../../models/organization";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatCard, MatCardContent} from "@angular/material/card";
import {OrganizationDetailsComponent} from "../../components/organization-details/organization-details.component";

@Component({
  selector: 'rb-organization-details-page',
  templateUrl: './organization-details-page.component.html',
  imports: [
    LoaderComponent,
    TranslatePipe,
    MatCard,
    MatCardContent,
    OrganizationDetailsComponent
  ]
})
export class OrganizationDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);

  loading = false;
  entity = this.activatedRoute.snapshot.parent?.data['entity'] as AppOrganization;
}
