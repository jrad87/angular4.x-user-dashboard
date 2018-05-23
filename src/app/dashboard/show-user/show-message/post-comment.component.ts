import { 
	Component, 
	OnInit, 
	Input,
	Output,
	EventEmitter } from '@angular/core';
import { Comment } from 'classes/comment';

import { AuthService } from 'app/services/auth.service';
import { CommentService } from 'app/services/comment.service';

@Component({
	selector: 'app-post-comment',
	template: `
		<div class="post-comment-container">
			<h2>Post Comment</h2>
			<ul *ngIf="errors">
				<li *ngFor="let error of errors">{{error}}</li>
			</ul>
			<form>
				<textarea 
					name="text" 
					[(ngModel)]="commentBuffer.text" 
					el-autofocus
					(blur)="commentBuffer.text === '' ? cancelComment() : postComment()"
				></textarea>
				<button (click)="postComment()" type="button">Add comment</button>
			</form>
		</div>
	`,
	styles: [`
		.post-comment-container {
			padding: 10px;
			margin: 10px 0px 0px 30px;
			border: 5px solid black;
			border-radius: 10px;
		}
	`]
})
export class PostCommentComponent implements OnInit {
	@Input() commentOn: string;
	@Output() commentPosted = new EventEmitter();
	@Output() commentFailed = new EventEmitter();
	@Output() commentCanceled = new EventEmitter();
	errors: string[];
	commentBuffer: Comment = new Comment();
	
	constructor(
		private _comments: CommentService,
		private _auth: AuthService
	){}

	postComment() {
		this._comments.postComment(this.commentBuffer)
			.then(newComment => {
				this.commentPosted.emit(newComment);
				this.resetBuffers();
			})
			.catch(errorResponse => {
				this.errors = errorResponse.json();		
				this.commentFailed.emit();
			})
	}
	
	cancelComment() {
		this.commentCanceled.emit();
	}



	resetBuffers() {
		this.commentBuffer = new Comment();
		this.commentBuffer.commentOn = this.commentOn;
		this.commentBuffer.commentFrom = this._auth.userID();
	}

	doStuff(e){
		console.log('stuff')
		console.log(e);
		e.preventDefault();
		console.log(e);
	}

	ngOnInit() {
		this.commentBuffer.commentFrom = this._auth.userID();
		this.commentBuffer.commentOn = this.commentOn;
	}
}
