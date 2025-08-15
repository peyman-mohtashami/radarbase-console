import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {instanceConfig} from "../../../config/store/config.selectors";
import {AsyncPipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {LogoComponent} from '../../../../shared/components/logo/logo.component';

@Component({
  selector: 'rb-branding',
  templateUrl: './branding.component.html',
  imports: [
    AsyncPipe,
    TranslatePipe,
    LogoComponent
  ],
})
export class BrandingComponent {
  private readonly store = inject(Store);

  instanceConfig = this.store.select(instanceConfig);
}
