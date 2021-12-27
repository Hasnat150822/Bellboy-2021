import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: string, args: string): unknown {
    //parse int used to convert number into string first argument is use for value and 
    // second is used for converting system (i.e in example decimel number seystem is used)
    let limit = args ? parseInt(args, 10) : 10;
    let trail = '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}