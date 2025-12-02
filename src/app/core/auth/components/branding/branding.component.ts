import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LogoComponent} from '../../../../shared/components/logo/logo.component';
import {AppCustomizationService} from "../../../app-customization/services/app-customization.service";

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  imports: [
    TranslatePipe,
    LogoComponent
  ],
})
export class BrandingComponent {
  appCustomizationService = inject(AppCustomizationService)
}
