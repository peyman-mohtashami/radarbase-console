import {Component, inject, ChangeDetectionStrategy, input, signal} from "@angular/core";
import {AppRevision} from "../../models/revision";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {BaseEntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {RevisionConfigService} from '../../services/revision-config.service';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {UserConfigService} from '../../../user/services/user-config.service';
import {AppUser} from '../../../user/models/user';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-revision-table-row',
  templateUrl: './revision-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ModificationComponent,
    LocalDateComponent,
    EntityTableRowComponent,
  ]
})
export class RevisionTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(RevisionConfigService);

  entity = input.required<AppRevision>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
