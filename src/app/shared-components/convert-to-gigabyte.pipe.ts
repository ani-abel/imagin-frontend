import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToGigabyte'
})
export class ConvertToGigabytePipe implements PipeTransform {

  transform(value: number): number {
    return value;
    //return parseInt((value / 1024).toFixed(3));
  }
}
