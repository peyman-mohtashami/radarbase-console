import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {DialogMode} from "../../../enums/dialog";
import {MatDialogClose} from "@angular/material/dialog";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'rb-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  imports: [
    MatDialogClose,
    MatButton,
    TranslatePipe,
    MatButton,
    MatProgressSpinner,
    MatIcon
  ]
})
export class DialogActionsComponent {
  DialogMode = DialogMode;

  isLoading = false;

  @Input() mode?: DialogMode;
  @Input() label?: {singular: string; plural: string;}

  @Output() actionTriggered = new EventEmitter();

  @Input() form?: UntypedFormGroup;

  close() {
    this.actionTriggered.emit('close');
  }

  delete() {
    this.actionTriggered.emit('delete');
  }

  save() {
    this.actionTriggered.emit('save');
  }
}
