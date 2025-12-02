import {Component, input, output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
})
export class QuestionListItemComponent {
  index = input.required<number>();
  questionFormControl = input.required<FormControl>();
  selectedQuestion = input.required<boolean>();

  remove = output<void>()
}
