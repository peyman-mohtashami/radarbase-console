import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
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
  private previewState = inject(PreviewStore);

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
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
          const _value = this.previewState.answers()[_arg]?.[0]?.value;
          acc[_arg] = _value;
          return acc;
        }, {});
        this.previewResult.set(await jexl.eval(expression, context));
      }

      this.previewValueChange.emit(this.previewResult());
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
