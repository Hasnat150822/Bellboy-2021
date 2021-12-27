import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seperateDecimal'
})
export class SeperateDecimalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var x = +value;
    x = +x.toFixed(2);
    let int_part = Math.trunc(x); // returns 3
    let float_part = Number((x-int_part).toFixed(3)); 
    float_part = Math.trunc(float_part*60);
    return int_part+" hrs "+float_part+" mins";
  }

}
