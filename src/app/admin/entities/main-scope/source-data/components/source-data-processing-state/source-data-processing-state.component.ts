import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {ProcessingState} from '../../models/source-data';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-data-processing-state',
  templateUrl: './source-data-processing-state.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent,
    TranslatePipe
  ]
})
export class SourceDataProcessingStateComponent {
  protected readonly ProcessingState = ProcessingState;

  processingState = input<ProcessingState | null>();
}
