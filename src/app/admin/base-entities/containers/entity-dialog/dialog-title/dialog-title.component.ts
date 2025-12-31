import {Component, input, output} from '@angular/core';
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

  dialogMode = input<DialogMode | string>();
  entityName = input<string>();
  entityMetadata = input<EntityRegistry>();
  customLabel = input<string>();
  // label = input<{ singular: string; plural: string }>();

  closeEvent = output<void>();

  close() {
    this.closeEvent.emit();
  }
}
