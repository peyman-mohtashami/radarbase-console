import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {
  ScrollableContentComponent
} from '../../../containers/questionnaire-preview/question/scrolable-content/scrollable-content.component';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-audio-question',
  imports: [
    ReactiveFormsModule,
    QuestionHeaderComponent,
    ScrollableContentComponent,
  ],
  templateUrl: './audio-question.component.html'
})
export class AudioQuestionComponent implements OnInit {

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
    this.onPreviewInputChange(`${Date.now()}`);
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
