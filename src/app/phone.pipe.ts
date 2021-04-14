import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    // remove all ( ) - and space characters
    const rawValue = value
      .split('(')
      .join('')
      .split(')')
      .join('')
      .split('-')
      .join('')
      .split(' ')
      .join('');
    // split number into 3 parts
    const areaCode = rawValue.slice(0, 3);
    const numbers1 = rawValue.slice(3, 6);
    const numbers2 = rawValue.slice(6, 10);
    // format number
    let output = '';
    if (areaCode) {
      output = `${areaCode}`;
    }
    if (numbers1) {
      output = `${output}-${numbers1}`;
    }
    if (numbers2) {
      output = `${output}-${numbers2}`;
    }
    // return formatted number
    return output;
  }
}
