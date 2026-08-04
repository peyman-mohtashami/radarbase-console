import {Component, inject, input, signal} from "@angular/core";
import {AppRevision} from "../../models/revision";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {RevisionConfigService} from '../../services/revision-config.service';
import {EntityTableRowComponent} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-revision-table-row',
  templateUrl: './revision-table-row.component.html',
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
