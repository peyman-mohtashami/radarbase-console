import {Component, input, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterLink,
  ],
})
export class LogoComponent {
  isMenuOpen = input<boolean>(true);
  url = input<string>('');
}
