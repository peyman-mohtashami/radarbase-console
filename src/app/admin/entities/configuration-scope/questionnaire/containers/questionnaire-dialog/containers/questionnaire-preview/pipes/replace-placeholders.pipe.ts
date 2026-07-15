import {inject, Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from "@angular/platform-browser";
import {PreviewStateService} from '../services/preview-state.service';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {QuestionType} from '../models/question';

@Pipe({
  name: 'replacePlaceholders',
  standalone: true
})
export class ReplacePlaceholdersPipe implements PipeTransform {
  private previewState = inject(PreviewStateService);
  private questionnaireDialogState = inject(QuestionnaireDialogStateService);

  transform(value: string | undefined, ...args: unknown[]): SafeHtml | undefined {
    if (value) {
      return this.buildTextWithTemplateVariables(value);
    }
    return undefined;
  }

  buildTextWithTemplateVariables(value: string) {
    return this.replacePlaceholders(value);
  }

  replacePlaceholders(str = ""): string {
    return str.replace(/\[([^[\]]+)]/g, (_, content: string) => {
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
        // TODO: handle questionnaire-specific lookup
        const answer = this.getAnswerFromPlaceholder(placeholder);
        return answer != null ? String(answer) : `<span class="underline text-red-700">[${content}]</span>`;
        // return `[${content}]`;
      }

      const answer = this.getAnswer(questionId, questionnaireId, operator, startTimestamp, endTimestamp); //answers?.[questionId]?.[0]?.value;

        // Replace it with the answer if it exists; otherwise leave the placeholder unchanged
        return answer != null ? String(answer) : `<span class="underline text-red-700">[${content}]</span>`;
    });
  }

  getAnswer(questionId: string, questionnaireId?: string, operator?: string, startTimestamp?: string, endTimestamp?: string): string | null {
    if (!questionnaireId) {
      const answers = this.previewState.answers();//?.[questionId]?.[0]?.value ?? null;
      const answer = answers?.[questionId]?.[0];
      if (!answer) { return null}
      if (answer.type === QuestionType.CHECKBOX || answer.type === QuestionType.RADIO || answer.type === QuestionType.RANGE) {
        const questions = this.questionnaireDialogState.questionnaire()?.questions;
        const question = questions?.find(q => q.field_name === questionId);
        return question?.select_choices_or_calculations?.find(o => o.code === answer?.value)?.label[this.previewState.language().code] ?? answer?.value ?? null;
      } else {
        return answer?.value ?? null;
      }
    }
    return null;
  }

  private getAnswerFromPlaceholder(placeholder: Placeholder) {
    const inputs = this.previewState.placeholderAnswers();
    const answer = inputs.placeholders?.find(i => {
      return i.questionnaireId === placeholder.questionnaireId && i.questionId === placeholder.questionId
    });
    return answer?.value ?? null;
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
