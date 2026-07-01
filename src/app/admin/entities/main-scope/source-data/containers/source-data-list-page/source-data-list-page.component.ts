import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import { SourceDataTableRowComponent } from '../../components/source-data-table-row/source-data-table-row.component';
import {SourceDataService} from '../../services/source-data.service';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {AppSourceData, RadarSourceData} from '../../models/source-data';
import {SourceDataConfigService} from '../../services/source-data-config.service';
// import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-source-data-list-page',
  templateUrl: './source-data-list-page.component.html',
  imports: [
    // ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    SourceDataTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SourceDataListPageComponent extends BaseEntityListPageComponent<AppSourceData, RadarSourceData> {
  override entityService = inject(SourceDataService);
  override configService = inject(SourceDataConfigService);
  override dialogService = inject(SourceDataDialogService);

  override entities = signal<AppSourceData[]>(this.activatedRoute.snapshot.data['sourceDataList']);
}
