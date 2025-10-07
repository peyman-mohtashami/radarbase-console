import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {ProcessingState} from '../../models/source-data';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'rb-source-data-processing-state',
  templateUrl: './source-data-processing-state.component.html',
  imports: [
    TagComponent,
    TranslatePipe
  ]
})
export class SourceDataProcessingStateComponent {
  protected readonly ProcessingState = ProcessingState;

  processingState$ = input<ProcessingState>();
}
