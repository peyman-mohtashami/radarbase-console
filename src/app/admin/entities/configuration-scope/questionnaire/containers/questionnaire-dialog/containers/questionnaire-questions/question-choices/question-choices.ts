import {Component, inject, input, Input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AppQuestionChoice} from '../../../../../models/questionnaire';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {TranslatePipe} from '@ngx-translate/core';
import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {QuestionChoice} from '../question-choice/question-choice';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';

@Component({
  selector: 'app-question-choices',
  templateUrl: './question-choices.html',
  imports: [
    MatIcon,
    MatIconButton,
    TranslatePipe,
    CdkDropList,
    QuestionChoice,
  ],
})
export class QuestionChoices {
  @Input() choices: AppQuestionChoice[] = [];
  languages = input.required<RadarOption[]>();

  valueChange = output<AppQuestionChoice[]>();

  protected questionnaireStateService = inject(QuestionnaireStateService);

  addItem(index: number) {
    this.choices.splice(index + 1, 0, {
      code: '',
      label: {},
    });
  }

  removeItem(index: number) {
    this.choices.splice(index, 1);
    this.valueChange.emit(this.choices);
  }

  protected onValueChange(event: AppQuestionChoice, index: number) {
    this.choices[index] = event;
    this.valueChange.emit(this.choices);
  }

  protected onDrop($event: CdkDragDrop<any, any, any>) {

  }
}
