import {Component, inject, input, OnInit, output} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {PreviewStore} from '../../../services/preview.store';

@Component({
  selector: 'app-variable-question',
  imports: [],
  templateUrl: './variable-question.component.html'
})
export class VariableQuestionComponent implements OnInit {
  previewStore = inject(PreviewStore);

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  valueChange = output<string | null>();

  async ngOnInit(): Promise<void> {
    const value = this.previewStore.variables().find(v => v.name === this.question().field_name)?.value ?? null;
    this.valueChange.emit(value);
  }
}
