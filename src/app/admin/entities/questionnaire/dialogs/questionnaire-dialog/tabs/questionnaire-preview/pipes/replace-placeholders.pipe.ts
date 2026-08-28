import {inject, Pipe, PipeTransform} from '@angular/core';
import {PreviewStore} from '../services/preview.store';
import {QuestionnaireStore} from '../../../../../services/questionnaire.store';
import {AppQuestionChoice, QuestionType} from '../../../../../models/questionnaire';

@Pipe({
  name: 'replacePlaceholders',
  pure: false
})
export class ReplacePlaceholdersPipe implements PipeTransform {
  private previewState = inject(PreviewStore);
  private store = inject(QuestionnaireStore);
  private variables = this.store.selected()?.variables;

  transform(value: string | undefined): string | undefined {
    if (value?.toString()) {
      return this.buildTextWithTemplateVariables(value.toString());
    }
    return undefined;
  }

  buildTextWithTemplateVariables(value: string): string {
    return this.replacePlaceholders(value);
  }

  replacePlaceholders(str = ""): string {
    return str.toString().replace(/\{\{([^{}]*)}}/g, (_, content: string) => {
      const questionTemplateVariable = this.variables?.find(v => v.name === content);

      switch (questionTemplateVariable?.type) {
        case 'question': {
          if (!questionTemplateVariable.questionId) return `<span class="underline text-red-700">{{${content}}</span>`;

          const answer = this.getAnswer(questionTemplateVariable.questionId!);
          return answer !== null ? String(answer) : `<span class="underline text-red-700">{{${content}}}</span>`;
        }
        default: {
          const variableInput = this.previewState.variables().find(v => v.name === content);
          return variableInput?.value || `<span class="underline text-red-700">{{${content}}}</span>`
        }
      }
    });
  }

  getAnswer(questionId: string): string | null {
    const answers = this.previewState.answers();//?.[questionId]?.[0]?.value ?? null;
    const answer = answers?.[questionId]?.[0];
    if (!answer) { return null}

    const questions = this.store.selected()?.questions;
    const question = questions?.find(q => q.field_name === questionId);
    if (answer.type === QuestionType.RADIO || answer.type === QuestionType.RANGE) {
      return question?.select_choices_or_calculations?.find(o => o.code === answer?.value)?.label[this.previewState.language().code] ?? answer?.value ?? null;
    } else if (answer.type === QuestionType.CHECKBOX) {
      const t=  (question?.select_choices_or_calculations?.filter(o => answer?.value?.includes(o.code)).map(o => o?.label[this.previewState.language().code] ?? answer?.value ?? null) ?? null);
      return t ? t.join(', ') : null;
    } else if (answer.type === QuestionType.YESNO) {
      const select_choices_or_calculations: AppQuestionChoice[] =  [{code: '0', label: {en: 'No'}}, {code: '1', label: {en: 'Yes'}}];
      return select_choices_or_calculations?.find(o => o.code === answer?.value)?.label[this.previewState.language().code] ?? answer?.value ?? null;
    } else {
      return answer?.value ?? null;
    }
  }
}
