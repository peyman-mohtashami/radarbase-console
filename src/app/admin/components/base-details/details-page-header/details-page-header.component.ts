import { Component, EventEmitter, Input, Output } from "@angular/core";
import {DialogMode} from "../../../enums/dialog";
import {ENTITY_NAME} from "../../../enums/entities";
import {ENTITIES} from "../../../consts/entities";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RbPermissionDirective} from "../../../../core/auth/directives/ng-permission.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'rb-details-page-header',
  templateUrl: './details-page-header.component.html',
  imports: [
    MatMenuTrigger,
    RbPermissionDirective,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatCard,
    MatCardContent,
    MatIconButton,
  ]
})
export class DetailsPageHeaderComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ENTITIES = ENTITIES;

  @Input()
  entityName?: ENTITY_NAME;

  @Input()
  entity?: any;

  @Input()
  buttons: {
    edit?: {disabled?: boolean; disableMessage?: string;};
    delete?: {disabled?: boolean; disableMessage?: string;}
  } = {
    edit: {
      disabled: false,
      disableMessage: ""
    },
    delete: {
      disabled: false,
      disableMessage: ""
    }
  }

  @Output()
  action = new EventEmitter<{mode: DialogMode; entity: any}>();

  onAction(event: {mode: DialogMode; entity: any}){
    this.action.emit(event);
  }
}
