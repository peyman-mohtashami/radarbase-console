import {Component, inject} from "@angular/core";
import {AppRevision} from "../../models/revision";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {RevisionConfigService} from '../../services/revision-config.service';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-revision-table-row',
  templateUrl: './revision-table-row.component.html',
  imports: [
    ModificationComponent,
    LocalDateComponent,
    EntityComponent,
  ]
})
export class RevisionTableRowComponent extends BaseEntityComponent<AppRevision> {
  override configService = inject(RevisionConfigService);
}
