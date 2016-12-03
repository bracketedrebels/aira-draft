import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emph'
})
export class EmphPipe implements PipeTransform {

  transform(anEmph: RegExp, aTarget: string): string {
    return aTarget.replace(anEmph, `$1<span>$2</span>$3`);
  }

}
