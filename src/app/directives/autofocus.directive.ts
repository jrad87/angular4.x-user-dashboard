import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({ selector: '[appAutofocus]'})
export class AutofocusDirective {
    constructor(private el: ElementRef) {}
    @HostListener('blur') onblur() {
        // this.el.nativeElement.focus();
    }
}
