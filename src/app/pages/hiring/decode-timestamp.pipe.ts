import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeTimestamp'
})
export class DecodeTimestampPipe implements PipeTransform {

  transform(value) {
    return new Date(+value);
  }

}
