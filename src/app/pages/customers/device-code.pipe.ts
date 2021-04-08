import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceCode'
})
export class DeviceCodePipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case 1:
          return "Android"
        break;
      case 2:
          return "iOS"
        break;
      default:
          return "-"
        break;
    }
  }

}
