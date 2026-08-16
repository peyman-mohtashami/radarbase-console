import {Component, inject, input, output} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {UpperCasePipe} from '@angular/common';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {MatHint} from '@angular/material/input';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {QuestionsStore} from '../../services/questions.store';

@Component({
  selector: 'app-question-button',
  templateUrl: './question-button.component.html',
  imports: [
    MatIconButton,
    TranslatePipe,
    MatIcon,
    TagComponent,
    MatTooltip,
    UpperCasePipe,
    MatHint,
  ],
})
export class QuestionButtonComponent {
  protected readonly DialogMode = DialogMode;

  protected questionsStore = inject(QuestionsStore);
  protected store = inject(QuestionnaireStore);

  entity = input.required<AppQuestion>();
  index = input.required<number>();
  matrixIndex = input<number>();


  removeEvent = output<void>();
  selectEvent = output<void>();

  protected removeQuestion(event: PointerEvent) {
    event.stopPropagation();
    this.removeEvent.emit();
  }

  protected selectQuestion(event: Event) {
    event.stopPropagation();
    this.selectEvent.emit();
  }
}
