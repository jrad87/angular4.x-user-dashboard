import { Component,	OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'classes/comment';
import { User } from 'classes/user';
import { AuthService } from 'app/services/auth.service';
import { CommentService } from 'app/services/comment.service';

@Component({
	selector: 'app-show-comment',
	template:`
		<div class="comment-container" 
			*ngIf="!isEditing">
			<h2>{{comment.commentFrom.username}} said ...</h2>
			<p>{{comment.text}}</p>
			<button 
				*ngIf="hasEditPrivileges"
				(click)="toggleEditing()">Edit</button>
			<button 
				*ngIf="hasDeletePrivileges"
				(click)="deleteComment()">Delete</button>
		</div>
		<div class="comment-container"
			*ngIf="isEditing">
                        <textarea placeholder="{{comment.text}}"></textarea>
			<button (click)="toggleEditing()">Cancel</button>
			<button (click)="saveEdit">Save</button>
		</div>
	`,
	styles: [`
		h2 {
			font-size: 1.2rem;
		}
		.comment-container {
			margin: 10px 0px 0px 30px;
			padding: 10px;
			border: 5px solid black;
			border-radius: 10px;
		}
	`]
})
export class ShowCommentComponent implements OnInit {
	@Input() comment: Comment = new Comment();
	@Input() messageTo: string;
	@Output() commentRemoved = new EventEmitter();
	@Output() saveEdit = new EventEmitter(); 

	hasDeletePrivileges: boolean = false;
	hasEditPrivileges: boolean = false;
	isEditing: boolean = false;

	toggleEditing() {
		this.isEditing = !this.isEditing;
	}

	deleteComment() {
		this._comments.deleteComment(this.comment)
			.then(updatedMessage => {
				this.commentRemoved.emit(updatedMessage);
			})
			.catch(console.log)
	}

	constructor(
		private _comments: CommentService,
		private _auth: AuthService
	){}
		
	ngOnInit(){
		if (this._auth.userID() === (this.comment.commentFrom as User)._id.toString()){
			this.hasDeletePrivileges = true;
			this.hasEditPrivileges = true;
		}
		if (this._auth.userID() === this.messageTo){
			this.hasDeletePrivileges = true;
			this.hasEditPrivileges = false;
		}
	}
}
