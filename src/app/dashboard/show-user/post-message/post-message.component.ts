import {
	Component,
	OnInit,
	OnChanges,
	SimpleChanges,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { Message } from 'classes/message';
import { MessageService } from 'app/services/message.service';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';

@Component({
	selector: '<app-post-message>',
	template: `
		<fieldset>
			<legend>Post a message</legend>
			<ul *ngIf="errors">
				<li *ngFor="let error of errors">{{error}}</li>
			</ul>
			<form (submit)="postMessage()">
				<textarea name="text" [(ngModel)]="messageBuffer.text"></textarea>
				<button type="submit">Post Message</button>
			</form>
		</fieldset>
	`
})
export class PostMessageComponent implements OnInit, OnChanges {
	@Input() messageTo: string;
	messageBuffer: Message = new Message();
	errors: string[] = [];
	@Output() messagePosted = new EventEmitter();

	constructor(
		private _auth: AuthService,
		private _users: UserService,
		private _messages: MessageService
	) {}

	resetMessageBuffer() {
		this.messageBuffer = new Message();
		this.messageBuffer.messageFrom = this._auth.userID();
		this.messageBuffer.messageTo = this.messageTo;
		this.errors = [];
	}

	postMessage() {
		this._messages.postMessage(this.messageBuffer)
			.then( message => {
				return this._users.sendMessage(this.messageTo, message)
			})
			.then( createdMessage => {
				this.resetMessageBuffer();
				this.messagePosted.emit(createdMessage);
			})
			.catch(response => this.displayErrors(response.json()))
	}

	displayErrors(errors) {
		this.errors = errors;
	}

	ngOnInit() {
		this.messageBuffer.messageFrom = this._auth.userID();
	}

	ngOnChanges(changes: SimpleChanges) {
		// this.messageTo is assigned by an async process in the parent component,
		// therefore it must be attached to this.messageBuffer in the ngOnChanges hook
		if (changes.messageTo && changes.messageTo.currentValue) {
			this.messageBuffer.messageTo = changes.messageTo.currentValue;
		}
	}
}
