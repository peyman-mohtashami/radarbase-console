import {Component, inject, input, OnInit, output} from '@angular/core'
import {AnswerWithTimeLog} from '../../../models/kafka';
import {AppQuestion} from '../../../../../../../models/questionnaire';
import {CheckBoxItem} from '../checkbox-input/checkbox-input.component';
import {QuestionnaireStateService} from '../../../../../services/questionnaire-state.service';

@Component({
  selector: 'app-base-input',
  template: '<div></div>',
})
export abstract class BaseInputComponent implements OnInit {

  question = input.required<AppQuestion>();
  answer = input<AnswerWithTimeLog>();

  questionnaireStateService = inject(QuestionnaireStateService);

  valueChange = output<string | null>();

  isDisabled = false;
  selectedValue: string | null = null;

  ngOnInit() {
    // const { editable } = this.question();

    this.selectedValue = this.answer()?.value ?? null;
    // this.isDisabled = !editable && this.selectedValue !== null;
  }

  /**
   * Handles user input changes.
   * @param event The selected value.
   */
  onInputChange(event: any): void {
    if (!this.isDisabled) {
      this.selectedValue = `${event}`;
      this.valueChange.emit(this.selectedValue);
    }
  }

  /**
   * Resets the selected value.
   */
  onReset(): void {
    this.selectedValue = null;
    this.valueChange.emit(this.selectedValue);
  }
}
