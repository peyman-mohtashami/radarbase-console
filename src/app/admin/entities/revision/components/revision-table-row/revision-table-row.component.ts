import {Component, inject} from "@angular/core";
import {AppRevision} from "../../models/revision";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {BaseEntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {RevisionConfigService} from '../../services/revision-config.service';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';

@Component({
  selector: 'app-revision-table-row',
  templateUrl: './revision-table-row.component.html',
  imports: [
    ModificationComponent,
    LocalDateComponent,
    EntityTableRowComponent,
  ]
})
export class RevisionTableRowComponent extends BaseEntityTableRowComponent<AppRevision> {
  override configService = inject(RevisionConfigService);
}
