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
import { MessageService } from 'services/message.service';

@Component({
    selector: 'edit-message-form',
    template: `
        <div>
            <ul *ngIf="errors">
				<li *ngFor="let error of errors">{{error}}</li>
			</ul>
            <textarea #editMessageInput
                [(ngModel)]="editMessageBuffer">
            </textarea>
            <button type="button" (click)="cancelEdit()">Cancel</button>
            <button type="button" (click)="saveEdit()">Save Edit</button>
        </div>
    `, 
    styles: []
}) export class EditMessageFormComponent implements OnInit, AfterViewInit {
    @ViewChild('editMessageInput') 
    editMessageInput: ElementRef;
    @Input() message : Message;
    @Output() messageEdited = new EventEmitter();
    @Output() editingCanceled = new EventEmitter()

    errors: string[] = [];
    editMessageBuffer: string = ''

    constructor(
        private _messages: MessageService
    ) {}

    saveEdit() {
        this._messages.editMessage(this.message._id, this.editMessageBuffer)
            .then(editedMessage => {        
                this.messageEdited.emit(editedMessage);
            })
            .catch(errorResponse => this.displayErrors(errorResponse.json()))
    }
    cancelEdit() {
        console.log('cancel edit')
        this.editingCanceled.emit()
    }

    displayErrors(errors) {
        this.errors = errors;
    }

    ngOnInit() {
        this.editMessageBuffer = this.message.text;
    }
    ngAfterViewInit() {        
        this.editMessageInput.nativeElement.focus()
    }
}
