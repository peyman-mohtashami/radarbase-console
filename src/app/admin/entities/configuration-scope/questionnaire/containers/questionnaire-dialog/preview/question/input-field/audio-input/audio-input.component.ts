import {
  Component,
  OnInit,
} from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import {QuestionHeaderComponent} from "../../question-header/question-header.component";
import {ScrollableContentComponent} from "../../scrolable-content/scrollable-content.component";

@Component({
  selector: 'app-audio-input',
  templateUrl: 'audio-input.component.html',
  imports: [
    TranslatePipe,
    QuestionHeaderComponent,
    ScrollableContentComponent,
  ]
})
export class AudioInputComponent extends BaseInputComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.onInputChange(Date.now())
  }
}
