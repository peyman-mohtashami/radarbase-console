import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {QuestionHeaderComponent} from '../../question-header/question-header.component';
import jexl from 'jexl';
import {PreviewStore} from '../../../services/preview.store';

@Component({
  selector: 'app-calculation-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './calculation-question.component.html'
})
export class CalculationQuestionComponent implements OnInit {
  private store = inject(PreviewStore);

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  valueChange = output<string | null>();
  result = signal('N/A');

  async ngOnInit(): Promise<void> {
      jexl.addTransform('num', (val) => Number(val) || 0);

      const expression = this.question().calculation_fn;
      const args = this.question().calculation_args?.split(',');
      if (expression && args) {
        const context = args.reduce((acc: Record<string, string | null>, arg) => {
          const _arg = arg.trim();
          acc[_arg] = this.store.answers()[_arg]?.[0]?.value;
          return acc;
        }, {});
        this.result.set(await jexl.eval(expression, context));
      }

      this.valueChange.emit(this.result());
  }
}
