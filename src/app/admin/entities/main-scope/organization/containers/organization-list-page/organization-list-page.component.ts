import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {AppOrganization, RadarOrganization} from '../../models/organization';
import {OrganizationTableRowComponent} from '../../components/organization-table-row/organization-table-row.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-organization-list-page',
  templateUrl: './organization-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    OrganizationTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class OrganizationListPageComponent extends BaseEntityListPageComponent<AppOrganization, RadarOrganization> {

  override entityService = inject(OrganizationService);
  override configService = inject(OrganizationConfigService);
  override dialogService = inject(OrganizationDialogService);

  override entities = signal<AppOrganization[]>(this.activatedRoute.snapshot.data['organizationList']);

  override gridView = true;
}
