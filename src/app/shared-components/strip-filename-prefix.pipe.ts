import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripFilenamePrefix'
})
export class StripFilenamePrefixPipe implements PipeTransform {

  transform(value: string): string {
    const stringToArray: string[] = value.split("-");
    stringToArray.shift();
    return stringToArray.toString().replace(/\,/g, " ");
  }

}
