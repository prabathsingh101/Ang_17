import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(value: any, SearchTerm: any): any {
    if (value.length === 0) {
      return value;
    }
    return value.filter(function (search: any) {
      return search.classname.toLowerCase().indexOf(SearchTerm.toLowerCase() > -1);
    });
  }
}
