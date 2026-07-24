import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LogoComponent} from '../../../../shared/components/logo/logo.component';
import {ConfigurationService} from '../../../configuration/services/configuration.service';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    LogoComponent
  ],
})
export class BrandingComponent {
  configurationService = inject(ConfigurationService)
}
