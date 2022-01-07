import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'safeUrl'
})
export class safeUrl implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
