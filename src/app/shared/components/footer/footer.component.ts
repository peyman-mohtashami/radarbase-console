import {Component, input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'rb-footer',
  templateUrl: './footer.component.html',
  imports: [
    TranslatePipe,
  ],
})
export class FooterComponent {
  isMenuOpen$ = input<boolean>(true)
}
