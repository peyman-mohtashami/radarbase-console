import { Component, EventEmitter, Input, Output } from '@angular/core';
import {DialogMode} from "../../../enums/dialog";
import {ENTITY_NAME} from "../../../enums/entities";
import {MatDialogTitle} from "@angular/material/dialog";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'rb-dialog-title',
  templateUrl: './dialog-title.component.html',
  imports: [
    MatDialogTitle,
    TranslatePipe,
    MatIconButton
  ]
})
export class DialogTitleComponent {
  DialogMode = DialogMode;

  @Input() mode?: DialogMode;
  @Input() name?: ENTITY_NAME;

  @Input() label?: { singular: string; plural: string };

  @Output() closeClicked = new EventEmitter();

  close() {
    this.closeClicked.emit();
  }
}
