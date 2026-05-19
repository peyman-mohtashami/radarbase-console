import {
  Component,
  input,
  output,
} from '@angular/core'

import {TranslatePipe} from '@ngx-translate/core'
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';


export enum ToolbarAction {
  CLOSE = 'close',
  NEXT = 'next',
  PREVIOUS = 'previous',
  FINISH = 'finish',
}

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  imports: [
    TranslatePipe,
    MatIcon,
    MatToolbar,
    MatButton,
  ]
})
export class ToolbarComponent {
  protected readonly Math = Math;

  isLeftButtonDisabled = input<boolean>(false);
  isRightButtonDisabled = input<boolean>(false);
  currentQuestionId = input.required<number>();
  totalQuestions = input.required<number>();
  isProgressCountShown = input<boolean>(false);

  toolbarEvent = output<ToolbarAction>();

  isDisabledButtonAlertOpen = false;

  leftButtonHandler(): void {
    if (this.isLeftButtonDisabled()) {
      return;
    }

    if (!this.currentQuestionId()) {
      return this.toolbarEvent.emit(ToolbarAction.CLOSE);
    } else {
      return this.toolbarEvent.emit(ToolbarAction.PREVIOUS);
    }
  }

  rightButtonHandler(): void {
    if (this.isRightButtonDisabled()) {
      this.isDisabledButtonAlertOpen = true;
      return;
    }

    if (this.currentQuestionId() === this.totalQuestions() - 1) {
      return this.toolbarEvent.emit(ToolbarAction.FINISH)
    } else {
      return this.toolbarEvent.emit(ToolbarAction.NEXT)
    }
  }
}
