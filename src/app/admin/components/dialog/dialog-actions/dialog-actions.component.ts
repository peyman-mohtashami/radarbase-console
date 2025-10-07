import {Component, EventEmitter, input, Output} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {DialogMode} from "../../../enums/dialog";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'rb-dialog-actions',
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

  mode$ = input<DialogMode>();
  label$ = input<{singular: string; plural: string;}>();
  form$ = input<UntypedFormGroup>();

  @Output() actionTriggered = new EventEmitter();

  isLoading = false;

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
