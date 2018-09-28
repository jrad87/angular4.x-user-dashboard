import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
    ElementRef
} from '@angular/core'

import { Message } from 'classes/message'

@Component({
    selector: 'edit-message-form',
    template: `
        <div>
            <form>
                <textarea #editMessageInput>{{message.text}}</textarea>
                <button type="button" (click)="cancelEdit()">Cancel</button>
                <button type="button" (click)="saveEdit()">Save Edit</button>    
            </form>
        </div>
    `, 
    styles: []
}) export class EditMessageFormComponent implements OnInit, AfterViewInit {
    @ViewChild('editMessageInput') 
    editMessageInput: ElementRef;
    @Input() message : Message;
    @Output() editingEnded = new EventEmitter()
    saveEdit() {
        console.log('save edit')
        this.editingEnded.emit()
    }
    cancelEdit() {
        console.log('cancel edit')
        this.editingEnded.emit()
    }
    ngOnInit() {
        //console.log(this.message)
    }
    ngAfterViewInit() {
        console.log(this.editMessageInput.nativeElement)
        
        this.editMessageInput.nativeElement.focus()
    }
}
