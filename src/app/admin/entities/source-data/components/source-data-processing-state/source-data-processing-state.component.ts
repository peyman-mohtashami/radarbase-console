import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ProcessingState} from '../../../../../shared/models/radar-source-data.model';

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
