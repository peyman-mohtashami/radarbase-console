import {Component, computed, inject, input} from '@angular/core';
import {formatDate} from '@angular/common';
import {toSignal} from "@angular/core/rxjs-interop";

import {localeService} from "../../services/locale.service";

@Component({
  selector: 'rb-local-date',
  template: '{{ dateResult() }}',
})
export class LocalDateComponent {
  private localeService = inject(localeService);

  date = input<number | string | Date>();
  format = input<string>('shortDate');

  private localeSignal = toSignal(this.localeService.locale$)

  dateResult = computed(() => {
    const _date = this.date();
    const _format = this.format();
    const _locale = this.localeSignal()?.currentLanguage?.locale || 'en-US';

    return _date ? formatDate(_date, _format, _locale) : '-';
  });
}
