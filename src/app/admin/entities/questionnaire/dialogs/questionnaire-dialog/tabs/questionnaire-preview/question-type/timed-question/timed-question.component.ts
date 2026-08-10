import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  WritableSignal,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';

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
  selector: 'app-timed-question',
  imports: [
    MatButton,
    QuestionHeaderComponent,
  ],
  templateUrl: './timed-question.component.html'
})
export class TimedQuestionComponent implements OnInit {
  private dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  ngOnInit(): void {
    this.initTimer();
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }

  taskTimer!: TaskTimer;
  startTime!: number
  endTime!: number

  initTimer() {
    const fieldAnnotation = this.entity().field_annotation as {
      image: string
      timer: {
        start: string
        end: string
      }
      unit: string
    };
    const timer = fieldAnnotation?.timer;
    const start = timer?.start ?? 0;
    const end = timer?.end ?? 0;

    this.taskTimer = {
      hasStarted: signal(false),
      hasFinished: signal(false),
      secondsElapsed: signal(0),
      secondsRemaining: signal(Number(start)),
      displayTime: signal(Number(start)),
      start: Number(start),
      end: Number(end),
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
    this.onPreviewInputChange(this.endTime.toString())
  }
}
