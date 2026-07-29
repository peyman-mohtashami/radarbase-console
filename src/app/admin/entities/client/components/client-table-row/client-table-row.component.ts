import {Component, inject, input, signal} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ClientDetailsComponent} from "../client-details/client-details.component";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ClientActionsComponent} from '../client-actions/client-actions.component';
import {DurationPipe} from '../../../../../shared/pipes/duration.pipe';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {AppClient} from '../../models/client';
import {ClientConfigService} from '../../services/client-config.service';

@Component({
  selector: 'app-client-table-row',
  templateUrl: './client-table-row.component.html',
  imports: [
    RouterLink,
    TagComponent,
    ClientDetailsComponent,
    EntityTableRowComponent,
    TranslatePipe,
    ClientActionsComponent,
    DurationPipe,
  ]
})
export class ClientTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(ClientConfigService);

  entity = input.required<AppClient>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
