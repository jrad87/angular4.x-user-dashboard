import {Directive, ElementRef, HostListener} from '@angular/core'

@Directive({
    selector: '[el-autofocus]'
}) export class AutofocusDirective {
    constructor(private el: ElementRef) {
    }
    @HostListener('blur') onblur() {
        //this.el.nativeElement.focus();
    }
    ngOnInit() {
        this.el.nativeElement.focus();
    } 
}