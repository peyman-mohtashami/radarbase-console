import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';

@Component({
  selector: 'app-number-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
  ],
  templateUrl: './number-question.component.html'
})
export class NumberQuestionComponent implements OnInit {
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

  protected error: any;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('text_validation_min')) {
        this.form.addControl(
          'text_validation_min',
          this.fb.control(this.entity().text_validation_min)
        );
      }
      if (!this.form.contains('text_validation_max')) {
        this.form.addControl(
          'text_validation_max',
          this.fb.control(this.entity().text_validation_max)
        );
      }
    }
  }

  get text_validation_min(): FormControl {
    return this.form.get('text_validation_min') as FormControl;
  }

  get text_validation_max(): FormControl {
    return this.form.get('text_validation_max') as FormControl;
  }

  protected onLogicInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.logicValueChange.emit(value);
  }

  protected onPreviewInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.previewValueChange.emit(value);
  }
}
