import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: number | null | undefined, unit: 's' | 'm' = 's'): string {
    if (value === null || value === undefined || value === 0) {
      return '0';
    }

    const totalSeconds = unit === 'm' ? value * 60 : value;

    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    const parts: string[] = [];

    if (d > 0) parts.push(`${d} ${this.translate.instant(d === 1 ? 'SHARED.UNIT.day' : 'SHARED.UNIT.days')}`);
    if (h > 0) parts.push(`${h} ${this.translate.instant(h === 1 ? 'SHARED.UNIT.hour' : 'SHARED.UNIT.hours')}`);
    if (m > 0) parts.push(`${m} ${this.translate.instant(m === 1 ? 'SHARED.UNIT.minute' : 'SHARED.UNIT.minutes')}`);
    if (s > 0 && unit === 's') parts.push(`${s} ${this.translate.instant(s === 1 ? 'SHARED.UNIT.second' : 'SHARED.UNIT.seconds')}`);

    return parts.join(', ');
  }
}
