import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'filtroMenu'
})

export class FiltroMenu implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}