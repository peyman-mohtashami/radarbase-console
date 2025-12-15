import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(value?: number, unit: string = 'min') {
    return value? this.minutesToWDHM(value, unit) : '0';
  }

  protected minutesToWDHM(value: number, unit: string): string {
    switch (unit) {
      case 'hour': {
        const d = Math.floor(value / 24);
        const h = Math.floor(value % 24);
        const m = 0;
        const dDisplay = `Day: ${d} - ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`

        return (dDisplay).replace(/,\s*$/, "");
      }
      default: {
        const d = Math.floor(value / (60 * 24));
        const h = Math.floor(value % (60 * 24) / 60);
        const m = Math.floor(value % 60);
        const dDisplay = `Day: ${d} - ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`

        return (dDisplay).replace(/,\s*$/, "");
      }
    }
  }
}
