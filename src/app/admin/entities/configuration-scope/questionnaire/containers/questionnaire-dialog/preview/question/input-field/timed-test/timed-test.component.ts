import {Component, OnInit, signal, WritableSignal} from '@angular/core'

import { QuestionHeaderComponent } from '../../question-header/question-header.component'
import { BaseInputComponent } from '../base-input/base-input.component'
import {ScrollableContentComponent} from '../../scrolable-content/scrollable-content.component'
import {MatButton} from '@angular/material/button';

export interface TaskTimer {
  secondsElapsed: WritableSignal<number>;
  secondsRemaining: WritableSignal<number>;
  hasStarted: WritableSignal<boolean>;
  hasFinished: WritableSignal<boolean>;
  displayTime: WritableSignal<number>;
  start: number;
  end: number;
}

@Component({
  selector: 'app-timed-test',
  templateUrl: 'timed-test.component.html',
  imports: [
    QuestionHeaderComponent,
    ScrollableContentComponent,
    MatButton,
  ]
})
export class TimedTestComponent extends BaseInputComponent implements OnInit {
  taskTimer!: TaskTimer;
  startTime!: number
  endTime!: number

  override ngOnInit() {
    super.ngOnInit()
    // if (this.question().field_annotation.autoStart !== 'false') {
    //   this.startTimer()
    // }
    this.initTimer()
  }

  initTimer() {
    const timer = this.question().field_annotation?.timer;
    const start = timer?.start ?? 0;
    const end = timer?.end ?? 0;

    this.taskTimer = {
      hasStarted: signal(false),
      hasFinished: signal(false),
      secondsElapsed: signal(0),
      secondsRemaining: signal(start),
      displayTime: signal(start),
      start: start,
      end: end,
    }
  }

  startTimer() {
    this.startTime = Date.now();
    this.taskTimer.hasStarted.set(true);
    this.endTime = this.startTime + (this.taskTimer.start - this.taskTimer.end) * 1000;
    this.timerTick();
  }

  updateCountdown() {
    this.taskTimer.secondsElapsed.set(Math.floor((Date.now() - this.startTime) / 1000));
    this.taskTimer.displayTime.set(this.taskTimer.start - this.taskTimer.secondsElapsed());
  }

  timerTick() {
    if (!this.taskTimer.hasStarted()) {
      return;
    }
    const timerId = setInterval(async () => {
      this.updateCountdown();

      if (this.endTime - Date.now() <= 0) {
        clearInterval(timerId);
        await this.stopTimer();
      }
    }, 1000);
  }

  async stopTimer() {
    this.taskTimer.hasFinished.set(true);
    this.onInputChange(this.endTime.toString())
  }
}
