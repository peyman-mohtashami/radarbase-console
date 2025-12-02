import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-message',
  templateUrl: './error-message.component.html',
  imports: [
    TranslatePipe,
  ]
})
export class ErrorMessageComponent {
  errorService = inject(ErrorService);
}
