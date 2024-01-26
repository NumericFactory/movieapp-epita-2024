import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printduration'
})
export class PrintdurationPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value) {
      let hour = Math.floor(value / 60);
      let min = value % 60;
      return hour > 0 ? hour + 'h' + min + 'm' : min + 'mn';
    }
    else {
      return '';
    }
  }

}
