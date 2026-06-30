import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {Validator as CustomValidator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {
  ScrollableContentComponent
} from '../../../containers/questionnaire-preview/question/scrolable-content/scrollable-content.component';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatSelectChange} from '@angular/material/select';
import {
  TaskTimer
} from '../../../containers/questionnaire-preview/question/input-field/timed-test/timed-test.component';

@Component({
  selector: 'app-timed-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    ScrollableContentComponent,
  ],
  templateUrl: './timed-question.component.html'
})
export class TimedQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('field_annotation')) {
        this.form.addControl(
          'field_annotation',
          this.fb.group({
            image: this.fb.control(this.entity().field_annotation?.image, {validators: [CustomValidator.requiredValidator]}),
            unit: this.fb.control(this.entity().field_annotation?.unit, {validators: [CustomValidator.requiredValidator]}),
            timer: this.fb.group({
              start: this.fb.control(this.entity().field_annotation?.timer?.start, {validators: [CustomValidator.requiredValidator]}),
              end: this.fb.control(this.entity().field_annotation?.timer?.end, {validators: [CustomValidator.requiredValidator]}),
            })
          })
        );
      }
    }
    if (this.type === 'preview') {
      this.initTimer();
    }
  }

  get field_annotation(): FormGroup {
    return this.form.get('field_annotation') as FormGroup;
  }

  get timer(): FormGroup {
    return this.field_annotation.get('timer') as FormGroup;
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }

  protected readonly ValidatorError = ValidatorError;

  taskTimer!: TaskTimer;
  startTime!: number
  endTime!: number

  initTimer() {
    const fieldAnnotation = this.entity().field_annotation as {
      image: string
      timer: {
        start: number
        end: number
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
    this.onPreviewInputChange(this.endTime.toString())
  }
}
