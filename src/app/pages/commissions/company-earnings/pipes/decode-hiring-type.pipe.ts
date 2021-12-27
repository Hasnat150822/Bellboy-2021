import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeHiringType'
})
export class DecodeHiringTypePipe implements PipeTransform {
  
  transform(hiring_type) {
    switch (hiring_type) {
      case 1:
        return 'Delivery'
      case 2:
        return 'Personal Assistant'
      case 3:
        return 'Ride'
      default:
        return 'B2B'
    }
  }

}
