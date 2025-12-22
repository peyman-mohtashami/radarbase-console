import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {AppOrganization} from '../../models/organization';
import {OrganizationTableRowComponent} from '../../components/organization-table-row/organization-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';

@Component({
  selector: 'app-organization-list-page',
  templateUrl: './organization-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    OrganizationTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class OrganizationListPageComponent extends BaseEntityListPageComponent<AppOrganization> implements OnInit, OnDestroy {

  override entityService = inject(OrganizationService);
  override configService = inject(OrganizationConfigService);
  override dialogService = inject(OrganizationDialogService);

  override entities = signal<AppOrganization[]>(this.activatedRoute.snapshot.data['organizationList']);
  // organizationFullList: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];

  override GRID_VIEW_ENABLED = true;
  override gridView = true;

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  // override getDialogData(entity?: AppOrganization) {
  //   return {
  //     entity,
  //     entities: this.entities(),
  //     // entities: this.organizationFullList
  //   }
  // }
}
