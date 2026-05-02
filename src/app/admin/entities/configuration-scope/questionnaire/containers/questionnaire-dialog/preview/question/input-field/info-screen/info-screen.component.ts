import {
  Component,
  OnInit,
} from '@angular/core'

// import { ReplacePlaceholdersPipe } from '../../../../pipes/replace-placeholders.pipe'
import {
  ScrollableContentComponent
} from '../../scrolable-content/scrollable-content.component'
import { QuestionHeaderComponent } from '../../question-header/question-header.component'
import { BaseInputComponent } from '../base-input/base-input.component'
// import {IonCard, IonCardContent} from "@ionic/angular/standalone";
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-info-screen',
  templateUrl: 'info-screen.component.html',
  imports: [
    ReplacePlaceholdersPipe,
    ScrollableContentComponent,
    QuestionHeaderComponent,
    // IonCard,
    // IonCardContent,
    MatCard,
    MatCardContent
  ]
})
export class InfoScreenComponent extends BaseInputComponent implements OnInit {}
