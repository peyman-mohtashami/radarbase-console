import {Component, inject, Input, InputSignal, OnInit, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatSelectChange} from '@angular/material/select';
import {
  QuestionHeaderComponent
} from '../../../tabs/questionnaire-preview/question/question-header/question-header.component';

@Component({
  selector: 'app-descriptive-question',
  imports: [
    ReactiveFormsModule,
    QuestionHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './descriptive-question.component.html'
})
export class DescriptiveQuestionComponent implements OnInit {
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: AppQuestionnaireLanguage[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  ngOnInit(): void {
    if (this.type === 'preview') {
      this.onPreviewInputChange(`${Date.now()}`);
    }
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
