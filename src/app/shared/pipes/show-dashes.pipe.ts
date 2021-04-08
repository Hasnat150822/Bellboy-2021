import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showDashes'
})
export class ShowDashesPipe implements PipeTransform {

  transform(value: any): any {
    return value? value:"-";
  }

}