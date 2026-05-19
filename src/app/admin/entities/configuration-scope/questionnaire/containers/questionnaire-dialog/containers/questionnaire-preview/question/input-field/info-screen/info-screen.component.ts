import {
  Component,
  OnInit,
} from '@angular/core'

import {
  ScrollableContentComponent
} from '../../scrolable-content/scrollable-content.component'
import { QuestionHeaderComponent } from '../../question-header/question-header.component'
import { BaseInputComponent } from '../base-input/base-input.component'
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-info-screen',
  templateUrl: 'info-screen.component.html',
  imports: [
    ReplacePlaceholdersPipe,
    ScrollableContentComponent,
    QuestionHeaderComponent,
    MatCard,
    MatCardContent
  ]
})
export class InfoScreenComponent extends BaseInputComponent implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.onInputChange(Date.now())
  }
}
