import {Component, EventEmitter, input, Output} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {DialogMode} from "../../../enums/dialog";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";

export enum DialogAction {
  CLOSE = 'close',
  SAVE = 'save',
  DELETE = 'delete'
}

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  imports: [
    MatButton,
    TranslatePipe,
    MatButton,
    MatProgressSpinner,
    MatIcon
  ]
})
export class DialogActionsComponent {
  protected readonly DialogMode = DialogMode;

  dialogMode = input<DialogMode>();
  label = input<{singular: string; plural: string;}>();
  form = input<UntypedFormGroup>();

  @Output() actionTriggered = new EventEmitter<DialogAction>(); //TODO

  isLoading = false;

  close() {
    this.actionTriggered.emit(DialogAction.CLOSE);
  }

  delete() {
    this.actionTriggered.emit(DialogAction.DELETE);
  }

  save() {
    this.actionTriggered.emit(DialogAction.SAVE);
  }
}
