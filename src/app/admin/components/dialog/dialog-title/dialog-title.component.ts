import {Component, EventEmitter, input, Output} from '@angular/core';
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
  protected readonly DialogMode = DialogMode;

  mode$ = input<DialogMode>();
  name$ = input<ENTITY_NAME>();
  label$ = input<{ singular: string; plural: string }>();

  @Output() closeClicked = new EventEmitter();

  close() {
    this.closeClicked.emit();
  }
}
