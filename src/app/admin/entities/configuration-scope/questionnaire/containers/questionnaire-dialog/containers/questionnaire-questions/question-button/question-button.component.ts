import {Component, inject, Input, input, output} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion} from '../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';

@Component({
  selector: 'app-question-button',
  templateUrl: './question-button.component.html',
  imports: [
    MatIconButton,
    TranslatePipe,
    MatIcon,
    TagComponent,
    MatTooltip,
  ],
})
export class QuestionButtonComponent {
  entity = input.required<AppQuestion>();
  selected = input.required<boolean>();

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
