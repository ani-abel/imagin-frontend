import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortenText",
})
export class ShortenTextPipe implements PipeTransform {
  transform(text: string, limit: number = 15): string {
    let shortenedText: string = text;
    if (text?.length > 15) {
      shortenedText = `${text.substr(0, limit)}...`;
    }
    return shortenedText;
  }
}
