import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  imports: [
    RouterLink,
  ],
})
export class LogoComponent {
  isMenuOpen = input<boolean>(true);
  url = input<string>('');
}
