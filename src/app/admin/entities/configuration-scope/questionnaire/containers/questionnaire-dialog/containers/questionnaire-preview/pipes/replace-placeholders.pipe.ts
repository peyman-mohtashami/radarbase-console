import {inject, Pipe, PipeTransform} from '@angular/core';
// import DOMPurify from "dompurify";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {PreviewStateService} from '../services/preview-state.service';
import {AnswerWithTimeLog} from '../models/kafka';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {QuestionType} from '../models/question';

@Pipe({
  name: 'replacePlaceholders',
  standalone: true
})
export class ReplacePlaceholdersPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  private previewState = inject(PreviewStateService);
  private questionnaireDialogState = inject(QuestionnaireDialogStateService);

  transform(value: string | undefined, ...args: unknown[]): SafeHtml | undefined {
    if (value) {
      return this.buildTextWithTemplateVariables(value);
    }
    return undefined;
  }

  buildTextWithTemplateVariables(value: string) {
    return this.replacePlaceholders(value);//, this.previewState.answers());
    // return value;
    // return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(value));
  }

  replacePlaceholders(
    str = "",
    // answers?: Record<string, AnswerWithTimeLog[]>
  ): string {
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
        return `[${content}]`;
      }

      const answer = this.getAnswer(questionId, questionnaireId, operator, startTimestamp, endTimestamp); //answers?.[questionId]?.[0]?.value;

        // Replace it with the answer if it exists; otherwise leave the placeholder unchanged
        return answer != null ? String(answer) : `[${content}]`;
    });
  }

  getAnswer(questionId: string, questionnaireId?: string, operator?: string, startTimestamp?: string, endTimestamp?: string): string | null {
    if (!questionnaireId) {
      const answers = this.previewState.answers();//?.[questionId]?.[0]?.value ?? null;
      const answer = answers?.[questionId]?.[0];
      if (answer.type === QuestionType.CHECKBOX || answer.type === QuestionType.RADIO || answer.type === QuestionType.RANGE) {
        const questions = this.questionnaireDialogState.selectedQuestionnaire()?.questions;
        const question = questions?.find(q => q.field_name === questionId);
        return question?.select_choices_or_calculations?.find(o => o.code === answer?.value)?.label[this.previewState.language()] ?? answer?.value ?? null;
      } else {
        return answer?.value ?? null;
      }
    }
    return null;
  }
}

interface Placeholder {
  questionnaireId?: string;
  questionId: string;
  operator?: string;
  startTimestamp?: string;
  endTimestamp?: string;
}

function parsePlaceholder(placeholder: string): Placeholder | null {
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


export function replacePlaceholders2(
  str?: string,
  answers?: Record<string, AnswerWithTimeLog[]>,
  // userAttr?: { [p: string]: any },
  // userName?: string,
  // userDateOfBirth?: string
) {
  if (!str) {
    return ""
  }
  const regex = /\[([^\]]+)]/g; // Regular expression to match strings between brackets
  const matches = str.match(regex); // Use match to get all matches
  const keys = matches?.map(match => match.substring(1, match.length - 1));
  let result = str
  keys?.forEach(k => {
    switch (k) {
      // case 'firstName': {
      //   const regex = new RegExp("\\[" + k + "\\]", "g");
      //   if (userName) {
      //     result = result.replace(regex, userName)
      //   } else {
      //     result = result.replace(regex, 'user')
      //   }
      //   break;
      // }
      // case 'dateOfBirth':
      //   if (userDateOfBirth) {
      //     const regex = new RegExp("\\[" + k + "\\]", "g");
      //     result = result.replace(regex, userDateOfBirth)
      //   }
      //   break;
      // case 'arm2RepeatQuestionnaire': {
      //   const weeks = userAttr?.['weeks'] ?? '12';
      //   if (weeks) {
      //     const regex = new RegExp("\\[" + k + "\\]", "g");
      //     result = result.replace(regex, weeks.toString())
      //   }
      //   break;
      // }
      default:
        if (answers?.[k] && answers[k][0]) {
          const regex = new RegExp("\\[" + k + "\\]", "g");
          const g = answers[k][0].value;
          if (g) {
            result = result.replace(regex, g)
          }
        }
        break;
    }
  })
  return result
}
