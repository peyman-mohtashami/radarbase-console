import {Component, computed, inject, input, output} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion} from '../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {UpperCasePipe} from '@angular/common';

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
    MatButton,
  ],
})
export class QuestionButtonComponent {
  entity = input.required<AppQuestion>();
  selected = input.required<boolean>();
  index = input.required<number>();

  removeEvent = output<void>();

  selectEvent = output<void>();
  questionnaireStateService = inject(QuestionnaireStateService);

  protected removeQuestion() {
    this.removeEvent.emit();
  }

  protected selectQuestion() {
    this.selectEvent.emit();
  }
}
