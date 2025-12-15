import {Component, input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    TranslatePipe,
  ],
})
export class FooterComponent {
  isMenuOpen = input<boolean>(true)
  readonly version = environment.version;
}
