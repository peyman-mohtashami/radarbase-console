import {Component, input, output} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion} from '../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {JsonPipe, UpperCasePipe} from '@angular/common';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';

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
    JsonPipe,
  ],
})
export class QuestionButtonComponent {
  entity = input.required<AppQuestion>();
  selected = input.required<boolean>();
  index = input.required<number>();
  language = input.required<RadarOption>();

  removeEvent = output<void>();
  selectEvent = output<void>();

  protected removeQuestion() {
    this.removeEvent.emit();
  }

  protected selectQuestion() {
    this.selectEvent.emit();
  }
}
