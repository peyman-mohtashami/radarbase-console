import {inject, Pipe, PipeTransform} from '@angular/core';
// import DOMPurify from "dompurify";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'replacePlaceholders',
  standalone: true
})
export class ReplacePlaceholdersPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | undefined, ...args: unknown[]): SafeHtml | undefined {
    if (value) {
      return this.buildTextWithTemplateVariables(value);
    }
    return undefined;
  }

  buildTextWithTemplateVariables(value: string) {
    return value;
    // return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(value));
  }
}
