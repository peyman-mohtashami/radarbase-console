import {inject, Pipe, PipeTransform} from '@angular/core';
// import DOMPurify from "dompurify";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {PreviewStateService} from '../services/preview-state.service';
import {AnswerWithTimeLog} from '../models/kafka';

@Pipe({
  name: 'replacePlaceholders',
  standalone: true
})
export class ReplacePlaceholdersPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  private previewState = inject(PreviewStateService);

  transform(value: string | undefined, ...args: unknown[]): SafeHtml | undefined {
    if (value) {
      return this.buildTextWithTemplateVariables(value);
    }
    return undefined;
  }

  buildTextWithTemplateVariables(value: string) {
    return replacePlaceholders(value, this.previewState.answers());
    // return value;
    // return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(value));
  }
}


export function replacePlaceholders(
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
