import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import { environment } from '../../../../environments/environment';
import {MenuStateService} from '../../../core/ui-state/menu-state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    TranslatePipe,
  ],
})
export class FooterComponent {
  protected readonly version = environment.version;
  protected readonly menuState = inject(MenuStateService);
}
