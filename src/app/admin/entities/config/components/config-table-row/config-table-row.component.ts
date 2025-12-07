import {Component, inject} from "@angular/core";
import {AppConfig} from '../../models/config';
import {MatTooltip} from "@angular/material/tooltip";
import {ActionsComponent} from "../actions/actions.component";
import {ConfigConfigService} from "../../services/config-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-config-table-row',
  templateUrl: './config-table-row.component.html',
  imports: [
    MatTooltip,
    ActionsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class ConfigTableRowComponent extends BaseEntityComponent<AppConfig>{
  override configService = inject(ConfigConfigService);
}
