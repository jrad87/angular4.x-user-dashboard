import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit } from '@angular/core';
import { User } from 'classes/user';
import { Message } from 'classes/message';
import { MessageService } from 'services/message.service';
import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-show-message',
	template: `
		<div class="row">
			<div class="col-md-8">
				<div class="message-container">
					<div *ngIf="!isEditing">
						<h2><a [routerLink]="['../', message.messageFrom._id]">
								{{message.messageFrom.username}}
							</a>
							said at {{message.createdAt | date}}
						</h2>
						<p>{{message.text}}</p>
					</div>
					<edit-message-form 
						*ngIf="isEditing"
						[message]="message"
						(messageEdited)="saveEdit($event)"
						(editingCanceled)="toggleEditing()">						
					</edit-message-form>									
					<div>
						<app-show-comment
							*ngFor="let comment of message.comments"
							[comment]="comment"
							[messageTo]="message.messageTo"
							(messageChanged)="updateMessage($event)">
						</app-show-comment>
					</div>
					<app-post-comment
						*ngIf="isCommenting"
						(commentPosted)="addComment($event)"
						(commentCanceled)="toggleCommenting()"
						[commentOn]="message._id">
					</app-post-comment>
				</div>
			</div>
			<div class="col-md-4">
				<app-message-actions
					[message]="message"
					(clickedDelete)="deleteMessage(message._id)"
					(clickedComment)="toggleCommenting()"
					(clickedEdit)="toggleEditing()"></app-message-actions>
			</div>
		</div>
	`,
	styles: [`
		h2 {
			font-size: 1.3rem;
		}
		.message-container {
			margin: 10px 0px;
			padding: 10px;
			border: 5px solid black;
			border-radius: 10px;
		}
	`]
})

export class ShowMessageComponent implements OnInit {
	@Input() message: Message;
	@Output() messageDeleted = new EventEmitter();
	@Output() messageChanged = new EventEmitter();
	isCommenting = false;
	isEditing = false;

	constructor(
		private _messages: MessageService,
		private _auth: AuthService
	) {}

	deleteMessage(id) {
		this._messages.deleteMessage(id)
			.then( () => {
				this.messageDeleted.emit(id);
			})
			.catch(console.log);
	}

	saveEdit(newMessage) {
		this.toggleEditing();
		this.updateMessage(newMessage);
	}

	updateMessage(newMessage) {
		this.message = newMessage;
		this.messageChanged.emit();
	}

	addComment(id: string): void {
		this._messages.addComment(id, this.message._id.toString())
			.then(message => {
				this.message = message;
				this.toggleCommenting();
				this.messageChanged.emit();
			})
			.catch(console.log);
	}

	toggleCommenting() { 
		this.isCommenting = !this.isCommenting; 
	}
	toggleEditing() { 
		this.isEditing = !this.isEditing; 
	}

	ngOnInit() {
		//console.log(this.message);
	}
}
