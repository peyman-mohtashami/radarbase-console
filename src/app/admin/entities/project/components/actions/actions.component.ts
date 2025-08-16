import {Component, input, output} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {AppProject} from "../../models/project";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'rb-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    TranslatePipe
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  entity = input.required<AppProject>();
  action = output<{mode: DialogMode; entity: AppProject}>();

  onAction(mode: DialogMode, entity: AppProject) {
    this.action.emit({mode, entity});
  }
}
