import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toDate',
})
export class ToDatePipe implements PipeTransform {

  transform(value: string): Date | null {
    const [day, month, year] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
