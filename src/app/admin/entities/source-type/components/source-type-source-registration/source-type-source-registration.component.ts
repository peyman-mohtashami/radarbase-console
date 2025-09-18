import {Component, input} from "@angular/core";
import {TagComponent} from "../../../../components/tag/tag.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'rb-source-type-source-registration',
  templateUrl: './source-type-source-registration.component.html',
  imports: [
    TagComponent,
    TranslatePipe
  ]
})
export class SourceTypeSourceRegistrationComponent {
  canRegisterDynamically$ = input<boolean>();
}
