import {Component, computed, inject, input} from '@angular/core';
import {formatDate} from '@angular/common';

import {LocaleService} from "../../services/locale.service";

@Component({
  selector: 'app-local-date',
  template: '{{ dateResult() }}',
})
export class LocalDateComponent {
  private localeService = inject(LocaleService);

  date = input<number | string | Date | null>();
  format = input<string>('shortDate');

  dateResult = computed(() => {
    const _date = this.date();
    const _format = this.format();
    const _locale = this.localeService.currentLocale()?.locale || 'en-US';

    return _date ? formatDate(_date, _format, _locale) : '-';
  });
}
