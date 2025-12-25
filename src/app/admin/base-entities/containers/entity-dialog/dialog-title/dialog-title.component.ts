import {Component, EventEmitter, input, Output} from '@angular/core';
import {DialogMode} from "../../../enums/dialog";
import {MatDialogTitle} from "@angular/material/dialog";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {EntityRegistry} from "../../../../../shared/consts/entity-registry";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dialog-title',
  templateUrl: './dialog-title.component.html',
  imports: [
    MatDialogTitle,
    TranslatePipe,
    MatIconButton,
    MatIcon
  ]
})
export class DialogTitleComponent {
  protected readonly DialogMode = DialogMode;

  dialogMode = input<DialogMode>();
  entityMetadata = input<EntityRegistry>();
  label = input<{ singular: string; plural: string }>();

  @Output() closeClicked = new EventEmitter();

  close() {
    this.closeClicked.emit();
  }
}
