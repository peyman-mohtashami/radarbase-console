import { Component, input, OnInit, output } from '@angular/core'
import {AppQuestion} from '../../../models/question';
import {AnswerWithTimeLog} from '../../../models/kafka';
// import { AppQuestion } from '../../../../../../core/app-lifecycle/questionnaire/models/question';
// import {AnswerWithTimeLog} from "../../../../../../core/data-ingestion/kafka/models/kafka";

@Component({
  selector: 'app-base-input',
  template: '<div></div>',
})
export abstract class BaseInputComponent implements OnInit {

  question = input.required<AppQuestion>();
  answer = input<AnswerWithTimeLog>();

  valueChange = output<string | null>();

  isDisabled = false;
  selectedValue: string | null = null;

  ngOnInit() {
    const { editable } = this.question();

    this.selectedValue = this.answer()?.value ?? null;
    this.isDisabled = !editable && this.selectedValue !== null;
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
