import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core'

import { Message } from 'classes/message'

@Component({
    selector: 'edit-message-form',
    template: `
        <div>
            <form>
                <textarea placeholder="{{message.text}}"></textarea>
                <button (click)="cancelEdit()">Cancel</button>
                <button (click)="saveEdit()">Save Edit</button>    
            </form>
        </div>
    `, 
    styles: []
}) export class EditMessageFormComponent implements OnInit {
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
}
