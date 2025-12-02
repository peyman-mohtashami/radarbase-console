import {Component, input} from "@angular/core";
import {SourceTypeScope} from '../../models/source-type';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-type-scope',
  templateUrl: './source-type-scope.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceTypeScopeComponent {
  protected readonly SourceTypeScope = SourceTypeScope;

  sourceTypeScope = input<SourceTypeScope | null>()
}
