import {Component, input, ChangeDetectionStrategy} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-source-type-source-registration',
  templateUrl: './source-type-source-registration.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent,
    TranslatePipe
  ]
})
export class SourceTypeSourceRegistrationComponent {
  canRegisterDynamically = input<boolean>();
}
