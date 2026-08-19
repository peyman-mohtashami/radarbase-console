import {
  Component,
  input,
  output,
  computed
} from '@angular/core'

import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TranslateLangPipe} from '../../pipes/translate-lang.pipe';


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
    MatIcon,
    MatButton,
    TranslateLangPipe,
  ]
})
export class ToolbarComponent {
  protected readonly Math = Math;

  leftButton = input.required<{enabled: boolean; label: string;}>();
  rightButton = input.required<{enabled: boolean; label: string;}>();
  progress = input.required<{enabled: boolean; current: number; total: number;}>();

  progressBarPercentage = computed(() => {
    const {current, total} = this.progress();
    if (current > total - 1) {
      return 100;
    }
    return Math.round((current + 1) / total * 100);
  });

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
