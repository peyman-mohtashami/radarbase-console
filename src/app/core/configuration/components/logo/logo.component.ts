import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  imports: [
    RouterLink,
  ],
})
export class LogoComponent {
  protected readonly appCustomizationService = inject(ConfigurationService);
}
