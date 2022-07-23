import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'errorKey'
})
export class ErrorKey implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    return Object.keys(value);
  }
}