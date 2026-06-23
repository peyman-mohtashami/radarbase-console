import {Component, effect, inject, input, output, viewChild, ViewContainerRef} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion} from '../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {UpperCasePipe} from '@angular/common';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {QUESTION_COMPONENTS} from '../../../components/question-type/question-type.registry';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';

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
  ],
})
export class QuestionButtonComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  // selectedQuestion = this.dialogState.selectedQuestion;
  // selectedQuestionIndex = this.dialogState.selectedQuestionIndex;
  // languages = this.dialogState.selectedQuestionnaire()?.languages;
  // language = this.dialogState.selectedQuestionnaire()?.defaultLanguage;

  entity = input.required<AppQuestion>();
  // selected = input.required<boolean>();
  index = input.required<number>();
  // language = input.required<RadarOption>();

  host = viewChild('questionHost', { read: ViewContainerRef });

  removeEvent = output<void>();
  selectEvent = output<void>();

  constructor() {
    effect(() => this.loadQuestionEditor());
  }

  protected removeQuestion(event: PointerEvent) {
    event.stopPropagation();
    this.removeEvent.emit();
  }

  protected selectQuestion() {
    this.selectEvent.emit();
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;

    host.clear();
    const componentType = QUESTION_COMPONENTS[this.entity().field_type];
    const componentRef = host.createComponent(componentType);
    componentRef.instance.type = 'button';
    // componentRef.instance.language = this.language;
    componentRef.instance.entity = this.entity;
  }
}
