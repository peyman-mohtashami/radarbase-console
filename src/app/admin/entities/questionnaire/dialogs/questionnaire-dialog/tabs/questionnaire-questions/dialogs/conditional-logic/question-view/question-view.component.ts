import {Component, effect, input, output, viewChild, ViewContainerRef, ChangeDetectionStrategy} from '@angular/core';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {AppQuestion} from '../../../../../../../models/questionnaire';
import {QUESTION_COMPONENTS} from '../../../components/question-type/question-type.registry';

@Component({
  selector: 'app-question-view',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: 'question-view.component.html',
})
export class QuestionViewComponent {

  question = input.required<AppQuestion>();
  operator = input.required<string>();
  conditionalLogicItem = input<ConditionalLogicItem>();

  selectionChange = output<any>();

  host = viewChild('questionHost', { read: ViewContainerRef });

  constructor() {
    effect(() => this.loadQuestionEditor());
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;
    host.clear();
    const componentType = QUESTION_COMPONENTS[this.question().field_type];
    const componentRef = host.createComponent(componentType);
    componentRef.setInput('type', 'logic');
    componentRef.setInput('type', this.question());//.instance.entity = this.question;
    componentRef.setInput('value', this.conditionalLogicItem()?.value);
    componentRef.setInput('operator', this.operator());

    componentRef.instance.logicValueChange.subscribe((value: any) => {
      console.log('Child emitted value:', value);
      this.selectionChange.emit(value);
    });
  }
}
