import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {SourceTypeScope} from '../../../../../shared/models/radar-source-type.model';

@Component({
  selector: 'rb-source-type-scope',
  templateUrl: './source-type-scope.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceTypeScopeComponent {
  protected readonly SourceTypeScope = SourceTypeScope;
  sourceTypeScope = input<SourceTypeScope>()
}
