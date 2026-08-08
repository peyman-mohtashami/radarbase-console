import {Component, effect, inject, input, output, viewChild, ViewContainerRef} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {JsonPipe, UpperCasePipe} from '@angular/common';
import {QUESTION_COMPONENTS} from '../question-type/question-type.registry';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {MatHint} from '@angular/material/input';

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
    JsonPipe,
  ],
})
export class QuestionButtonComponent {
  protected readonly DialogMode = DialogMode;

  protected dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  index = input.required<number>();
  matrixIndex = input<number>();

  // host = viewChild('questionHost', { read: ViewContainerRef });

  removeEvent = output<void>();
  selectEvent = output<void>();

  // constructor() {
    // effect(() => this.loadQuestionEditor());
  // }

  protected removeQuestion(event: PointerEvent) {
    event.stopPropagation();
    this.removeEvent.emit();
  }

  protected selectQuestion(event: Event) {
    event.stopPropagation();
    this.selectEvent.emit();
  }

  // private loadQuestionEditor(): void {
  //   const host = this.host();
  //   if (!host) return;
  //
  //   host.clear();
  //   const componentType = QUESTION_COMPONENTS[this.entity().field_type];
  //   const componentRef = host.createComponent(componentType);
  //   componentRef.setInput('type', 'button');//.instance.type = 'button';
  //   componentRef.setInput('entity', this.entity());//.instance.entity = this.entity;
  // }
}
