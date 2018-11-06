import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(customersList: any, searchStr: string, fieldName: string): any {
    if (customersList) {
      if (customersList.length === 0 || searchStr === '') {
        return customersList;
      }
      return customersList.filter(
        customer =>
        customer[fieldName].toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
      );
    }
  }
}
