import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {EntityRegistry} from "../../../../shared/consts/entity-registry";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-list-page-header',
  templateUrl: './list-page-header.component.html',
  imports: [
    TranslatePipe,
    MatIcon,
  ]
})
export class ListPageHeaderComponent {
  entityMetadata = input.required<EntityRegistry>();
}
