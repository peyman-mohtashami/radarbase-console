import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import jexl from 'jexl';
import {PreviewStore} from '../../services/preview.store';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

@Component({
  selector: 'app-calculation-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './calculation-question.component.html'
})
export class CalculationQuestionComponent implements OnInit {
  private store = inject(QuestionnaireStore);
  private previewState = inject(PreviewStore);

  entity = input.required<AppQuestion>();
  language = input(this.store.selected()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();
  previewResult = signal('N/A');

  protected error: any;

  async ngOnInit(): Promise<void> {
      jexl.addTransform('num', (val) => Number(val) || 0);

      const expression = this.entity().calculation_fn;
      const args = this.entity().calculation_args?.split(',');
      if (expression && args) {
        const context = args.reduce((acc: Record<string, any>, arg) => {
          const _arg = arg.trim();
          const _value = this.previewState.answers()[_arg][0].value;
          acc[_arg] = _value;
          return acc;
        }, {});
        this.previewResult.set(await jexl.eval(expression, context));
        console.log('Class: CalculationQuestionComponent, Function: ngOnInit, Line 82 result' , this.previewResult());
      }

      // this.previewValueChange.emit(null);
      this.previewValueChange.emit(this.previewResult());
      // const context = {
      //   height: 200,
      //   weight: 100,
      //   age: 5,
      // };


    // }
  }

  protected onPreviewInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.previewValueChange.emit(value);
  }
}
