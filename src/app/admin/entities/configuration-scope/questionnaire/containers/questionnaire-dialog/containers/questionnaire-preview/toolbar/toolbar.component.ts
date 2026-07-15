import {
  Component,
  input,
  output,
} from '@angular/core'

import {TranslatePipe} from '@ngx-translate/core'
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {TranslateLangPipe} from '../pipes/translate-lang.pipe';


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
    TranslateLangPipe,
  ]
})
export class ToolbarComponent {
  protected readonly Math = Math;

  leftButton = input.required<{enabled: boolean; label: string;}>();
  rightButton = input.required<{enabled: boolean; label: string;}>();
  progress = input.required<{enabled: boolean; current: number; total: number;}>();

  // isLeftButtonDisabled = input<boolean>(false);
  // isRightButtonDisabled = input<boolean>(false);
  // currentQuestionId = input.required<number>();
  // totalQuestions = input.required<number>();
  // isProgressCountShown = input<boolean>(false);

  toolbarEvent = output<ToolbarAction>();

  isDisabledButtonAlertOpen = false;

  leftButtonHandler(): void {
    if (!this.leftButton().enabled) {
      return;
    }

    if (this.leftButton().label === 'close') {
      return this.toolbarEvent.emit(ToolbarAction.CLOSE);
    } else {
      return this.toolbarEvent.emit(ToolbarAction.PREVIOUS);
    }
  }

  rightButtonHandler(): void {
    if (!this.rightButton().enabled) {
      this.isDisabledButtonAlertOpen = true;
      return;
    }

    if (this.rightButton().label === 'finish') {
      return this.toolbarEvent.emit(ToolbarAction.FINISH)
    } else {
      return this.toolbarEvent.emit(ToolbarAction.NEXT)
    }
  }
}
