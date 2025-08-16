import {Component, Input, input, output} from "@angular/core";
import {ENTITY_NAME} from "../../../enums/entities";
import {DialogMode} from "../../../enums/dialog";
import {ENTITIES} from "../../../consts/entities";
import {TranslatePipe} from "@ngx-translate/core";
import {RbPermissionDirective} from "../../../../core/auth/directives/ng-permission.directive";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'rb-entities-page-header',
  templateUrl: './entities-page-header.component.html',
  imports: [
    TranslatePipe,
    MatIconButton,
    RbPermissionDirective,
    MatButton
  ]
})
export class EntitiesPageHeaderComponent {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ENTITIES = ENTITIES;

  showTitle = input<boolean>(true);
  entityName = input.required<ENTITY_NAME>();
  enableAddButton = input<boolean>(true);
  permission = input<any>();

  //TODO
  @Input() isGridView?: boolean; // = input<boolean>();

  action = output<any>();
  gridListToggled = output<boolean>();

  onAction(event: any){
    this.action.emit(event);
  }

  toggleGridListView() {
    this.isGridView = !this.isGridView;
    this.gridListToggled.emit(this.isGridView);
  }
}
