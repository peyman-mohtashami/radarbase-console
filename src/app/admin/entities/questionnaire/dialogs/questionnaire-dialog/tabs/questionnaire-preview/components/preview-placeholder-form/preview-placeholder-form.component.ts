import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {form, FormField} from '@angular/forms/signals'
import {PreviewStore} from '../../services/preview.store';

export interface VariableInputForm {
  id: string
  name: string
  type: "reservedVariable" | "question" | "questionnaire" | "topic"
  reservedVariable?: string
  questionId?: string
  questionnaireId?: string
  method?: string
  start?: string
  end?: string
  function?: string
  topic?: string
  topicVariable?: string
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
    const variables = this.store.selected()?.variables;
    const t: VariableInputForm[] = (variables ?? []).map(v => {
      // if (v.type !== 'question') {
        return {...v, value: ''};
      // } else {
      //   return null;
      // }
    }).filter(v => !!v);

    this.model.set(t);
  }
}
