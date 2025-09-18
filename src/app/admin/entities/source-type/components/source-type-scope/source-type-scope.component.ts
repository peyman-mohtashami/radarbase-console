import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {SourceTypeScope} from '../../models/source-type';

@Component({
  selector: 'rb-source-type-scope',
  templateUrl: './source-type-scope.component.html',
  imports: [
    TagComponent,
  ]
})
export class SourceTypeScopeComponent {
  protected readonly SourceTypeScope = SourceTypeScope;
  sourceTypeScope$ = input<SourceTypeScope>()
}
