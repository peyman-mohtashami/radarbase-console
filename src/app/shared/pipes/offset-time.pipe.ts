import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offsetTime',
  standalone: true,
})
export class OffsetTimePipe implements PipeTransform {
  transform(offset: string | number): string {
    const totalMinutes = Number(offset);

    const day = Math.floor(totalMinutes / 1440);
    const minutesOfDay = totalMinutes % 1440;

    const hours = Math.floor(minutesOfDay / 60);
    const minutes = minutesOfDay % 60;

    return `Day: ${day}, Time: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}
