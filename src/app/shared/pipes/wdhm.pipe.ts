import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'wdhm',
})
export class WdhmPipe implements PipeTransform {

  transform(minutes?: number) {
    return minutes? this.minutesToWDHM(minutes) : '0';
  }

  protected minutesToWDHM(minutes: number): string {
    const w = Math.floor(minutes / (60*24*7));
    const d = Math.floor(minutes % (60*24*7) / (60*24));
    const h = Math.floor(minutes % (60*24) / 60);
    const m = Math.floor(minutes % 60);

    const wDisplay = w > 0 ? w + (w == 1 ? " week, " : " weeks, ") : "";
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";

    return (wDisplay + dDisplay + hDisplay + mDisplay).replace(/,\s*$/, "");
  }
}
