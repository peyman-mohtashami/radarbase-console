import {inject, Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from "@angular/platform-browser";
import {PreviewStore} from '../services/preview.store';
import {QuestionType} from '../models/question';
import {QuestionnaireStore} from '../../../../../services/questionnaire.store';
import {AppQuestion, AppQuestionChoice} from '../../../../../models/questionnaire';
import {QuestionTemplateVariable} from '../../questionnaire-variables/model/template-field.model';

const RESERVED_VALUES = ['current_date', 'current_time'];

@Pipe({
  name: 'replacePlaceholders',
  pure: false
})
export class ReplacePlaceholdersPipe implements PipeTransform {
  private previewState = inject(PreviewStore);
  private store = inject(QuestionnaireStore);

  transform(value: string | undefined, variables?: QuestionTemplateVariable[]): string | undefined {
    if (value?.toString()) {
      return this.buildTextWithTemplateVariables(value.toString(), variables);
    }
    return undefined;
  }

  buildTextWithTemplateVariables(value: string, variables?: QuestionTemplateVariable[]): string {
    return this.replacePlaceholders(value, variables);
  }

  replacePlaceholders(str = "", variables?: QuestionTemplateVariable[]): string {
    return str.toString().replace(/\{\{([^{}]*)\}\}/g, (_, content: string) => {
      console.log('Class: ReplacePlaceholdersPipe, Function: , Line 30 content' , content);
      console.log('Class: ReplacePlaceholdersPipe, Function: , Line 33 variables' , variables);
      const variable = variables?.find((v) => v.name === content);
      console.log('Class: ReplacePlaceholdersPipe, Function: , Line 34 variable' , variable);
      if (!variable) return content;
      const r = this.getAnswer(variable.questionId);
      console.log('Class: ReplacePlaceholdersPipe, Function: , Line 37 r' , r);
      if (!r) return content;
      console.log('Class: ReplacePlaceholdersPipe, Function: , Line 39 ' , );
      return r;
    });

    return str.toString().replace(/\[([^[\]]+)]/g, (_, content: string) => {
      const placeholder = parsePlaceholder(content);

      if (!placeholder) {
        // Invalid placeholder, leave unchanged
        return `[${content}]`;
      }

      const {
        questionnaireId,
        questionId,
        operator,
        startTimestamp,
        endTimestamp,
      } = placeholder;

      console.log({
        questionnaireId,
        questionId,
        operator,
        startTimestamp,
        endTimestamp,
      });

      if (questionnaireId) {
        const answer = this.getAnswerFromPlaceholder(placeholder);
        return answer !== null ? String(answer) : `<span class="underline text-red-700">[${content}]</span>`;
      }

      if (RESERVED_VALUES.includes(questionId)) {
        const answer = this.getReservedAnswer(questionId);
        return answer !== null ? String(answer) : `<span class="underline text-red-700">[${content}]</span>` ;
      }

      const answer = this.getAnswer(questionId);
      return answer !== null ? String(answer) : `<span class="underline text-red-700">[${content}]</span>`;
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
    // }
    // if (answer.type === QuestionType.CHECKBOX || answer.type === QuestionType.RADIO || answer.type === QuestionType.RANGE) {
    //   const questions = this.store.selected()?.questions;
    //   const question = questions?.find(q => q.field_name === questionId);
    //   return question?.select_choices_or_calculations?.find(o => o.code === answer?.value)?.label[this.previewState.language().code] ?? answer?.value ?? null;
    } else {
      return answer?.value ?? null;
    }
  }

  private getAnswerFromPlaceholder(placeholder: Placeholder) {
    const inputs = this.previewState.placeholderAnswers();
    const answer = inputs.placeholders?.find(i => {
      return i.questionnaireId === placeholder.questionnaireId && i.questionId === placeholder.questionId
    });
    return answer?.value ?? null;
  }

  private getReservedAnswer(value: string) {
    switch (value) {
      case 'current_date':
        return new Date().getTime();//.toLocaleDateString();
      case 'current_time':
        return new Date().toLocaleTimeString();
    }
    return null;
  }
}

export interface Placeholder {
  questionnaireId?: string;
  questionId: string;
  operator?: string;
  startTimestamp?: string;
  endTimestamp?: string;
}

export function parsePlaceholder(placeholder: string): Placeholder | null {
  const parts = placeholder.split(":");

  switch (parts.length) {
    case 1:
      return {
        questionId: parts[0],
      };

    case 2:
      return {
        questionnaireId: parts[0],
        questionId: parts[1],
      };

    case 3:
      return {
        questionnaireId: parts[0],
        questionId: parts[1],
        operator: parts[2],
      };

    case 5:
      return {
        questionnaireId: parts[0],
        questionId: parts[1],
        operator: parts[2],
        startTimestamp: parts[3],
        endTimestamp: parts[4],
      };

    default:
      return null;
  }
}
