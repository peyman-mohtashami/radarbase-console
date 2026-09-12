import {Component, computed, inject, input} from '@angular/core';
import {formatDate} from '@angular/common';

import {LocaleService} from "../../services/locale.service";

const FALLBACK_LOCALE = 'en-US';

@Component({
  selector: 'app-local-date',
  template: '{{ dateResult() }}',
})
export class LocalDateComponent {
  private readonly localeService = inject(LocaleService);

  date = input<number | string | Date | null>();
  format = input<string>('shortDate');

  dateResult = computed<string>(() => {
    const date = this.date();
    if (!date) return '-';

    const locale = this.localeService.currentLocale()?.locale || FALLBACK_LOCALE;
    return formatDate(date, this.format(), locale);
  });
}
