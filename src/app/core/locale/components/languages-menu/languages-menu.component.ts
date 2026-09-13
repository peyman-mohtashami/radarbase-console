import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {LocaleService} from '../../services/locale.service';
import {MatSuffix} from '@angular/material/input';
import {Language} from '../../../configuration/models/custom-configuration.model';

@Component({
  selector: 'app-languages-menu',
  templateUrl: './languages-menu.component.html',
  imports: [
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton,
    MatSuffix,
  ],
})
export class LanguagesMenuComponent {
  protected readonly localeService = inject(LocaleService);

  async switchLanguage(currentLanguage: Language): Promise<void> {
    await this.localeService.switchLanguage(currentLanguage);
  }
}
