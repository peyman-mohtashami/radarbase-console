import {Component} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LogoComponent} from '../../../configuration/components/logo/logo.component';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  imports: [
    TranslatePipe,
    LogoComponent
  ],
})
export class BrandingComponent {
}
