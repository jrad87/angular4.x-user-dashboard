import {
	Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from 'app/services/auth.service';
import { Message } from 'classes/message';
import { User } from 'classes/user';

@Component({
	selector: 'app-message-actions',
	template: `
		<div class="message-actions-container">
			<button
				(click)="comment()">Comment</button>
			<button
				*ngIf="userHasDeletePrivileges"
				(click)="delete()">Delete</button>
			<button
				*ngIf="userHasEditPrivileges"
				(click)="edit()">Edit</button>
		</div>
	`,
	styles: [`
		.message-actions-container {
			border: 5px solid black;
			border-radius: 10px;
			padding: 10px;
			margin: 10px 0px;
		}
		.message-actions-container button {
			display: block;
			width: 100%;
			margin-bottom: 10px;
		}
		.message-actions-container button:last-of-type {
			margin-bottom: 0px;
		}
	`]
})
export class MessageActionsComponent implements OnInit {
	@Input() message: Message;
	@Output() clickedEdit = new EventEmitter();
	@Output() clickedComment = new EventEmitter();
	@Output() clickedDelete = new EventEmitter();
	userHasDeletePrivileges = false;
	userHasEditPrivileges = false;

	constructor(
		private _auth: AuthService
	) {}

	comment() { this.clickedComment.emit(); }

	delete() { this.clickedDelete.emit(); }

	edit() { this.clickedEdit.emit(); }

	ngOnInit() {
		if (this._auth.userID() === (this.message.messageFrom as User)._id.toString()) {
			this.userHasDeletePrivileges = true;
			this.userHasEditPrivileges = true;
		} else if (this._auth.userID() === this.message.messageTo) {
			this.userHasDeletePrivileges = true;
		}
	}
}
