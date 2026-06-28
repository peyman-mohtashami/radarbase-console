import {Component, inject, Input, InputSignal, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';

@Component({
  selector: 'app-yesno-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatRadioButton,
    MatRadioGroup,
    QuestionHeaderComponent,
  ],
  templateUrl: './yesno-question.component.html'
})
export class YesNoQuestionComponent {
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);// ?? DEFAULT_LANGUAGE);// InputSignal<RadarOption>;
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

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
