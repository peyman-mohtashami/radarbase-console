import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {form, FormField} from '@angular/forms/signals'
import {PreviewStore} from '../../services/preview.store';

export interface VariableInputForm {
  name: string;
  type: string;
  reserved_var: string;
  topic: string;
  topic_var: string;
  questionnaireId: string;
  questionnaire_question: string;
  start: string;
  end: string;
  method: string;
  value: string;
}

export type VariablesInputForm = VariableInputForm[];

@Component({
  selector: 'app-preview-placeholder-form',
  templateUrl: 'preview-placeholder-form.component.html',
  imports: [
    MatFormField,
    MatInput,
    FormField
  ]
})
export class PreviewPlaceholderFormComponent implements OnInit {
  store = inject(QuestionnaireStore);
  previewStore = inject(PreviewStore);

  model = signal<VariablesInputForm>([]);
  form = form(this.model);

  constructor() {
    effect(() => {
      const model = this.model();
      this.previewStore.variables.set(model);
    });
  }

  async ngOnInit(): Promise<void> {
    const variables = this.store.selected()?.questions.filter(q => q.field_type === 'variable').map(q => ({name: q.field_name, ...q.variable}));

    const t: VariableInputForm[] = (variables ?? []).map(v => {
      return {
        name: v.name,
        type: v.type ?? '',
        reserved_var: v.reserved_var ?? '',
        topic: v.topic ?? '',
        topic_var: v.topic_var ?? '',
        questionnaireId: v.questionnaireId ?? '',
        questionnaire_question: v.questionnaire_question ?? '',
        start: v.start ?? '',
        end: v.end ?? '',
        method: v.method ?? '',
        value: ''
      }
    }).filter(v => !!v);

    this.model.set(t);
  }
}
