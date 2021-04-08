import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiringStatus'
})
export class HiringStatusPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case 1:
          return "Pending";
        break;
      case 2:
          return "In Progress";
        break;
      case 3:
          return "Non Closed Order";
        break;
      case 4:
          return "Completed";
        break;
      case 5:
          return "Cancelled";
        break;
      default:
        break;
    }
  }

}
