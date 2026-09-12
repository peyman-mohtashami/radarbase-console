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
  readonly isMenuOpen = input<boolean>(true);
  protected readonly version = environment.version;
}
