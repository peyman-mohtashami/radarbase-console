import { Component, OnInit } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'
// import DOMPurify from "dompurify";

import {
  ScrollableContentComponent
} from '../../scrolable-content/scrollable-content.component'

import { QuestionHeaderComponent } from '../../question-header/question-header.component'
import { BaseInputComponent } from '../base-input/base-input.component'

@Component({
  selector: 'app-descriptive-input',
  templateUrl: 'descriptive-input.component.html',
  imports: [
    ScrollableContentComponent,
    QuestionHeaderComponent
  ]
})
export class DescriptiveInputComponent extends BaseInputComponent implements OnInit {

  sanitizedHtml?: SafeHtml

  HTML_ALLOWED_TAGS = ['iframe']
  HTML_ALLOWED_ATTR = ['allow', 'allowfullscreen', 'frameborder', 'scrolling']

  // constructor(private sanitizer: DomSanitizer) {
  //   super()
  // }

  override ngOnInit(): void {
    // this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
    //   DOMPurify.sanitize(this.question().field_label!, {
    //     ADD_TAGS: this.HTML_ALLOWED_TAGS,
    //     ADD_ATTR: this.HTML_ALLOWED_ATTR
    //   })
    // )
    this.sanitizedHtml = this.question().field_label;
  }
}
