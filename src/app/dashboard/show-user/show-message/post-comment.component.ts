import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	AfterViewInit,
	ElementRef
} from '@angular/core';
import { Comment } from 'classes/comment';

import { AuthService } from 'services/auth.service';
import { CommentService } from 'services/comment.service';

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
					#postCommentInput
					name="text"
					[(ngModel)]="commentBuffer.text"
				></textarea>
				<button (click)="postComment()" type="button">Add comment</button>
				<button (click)="cancelComment()" type="button">Cancel</button>
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
export class PostCommentComponent implements OnInit, AfterViewInit {
	@ViewChild('postCommentInput')
	postCommentInput: ElementRef;
	@Input() commentOn: string;
	@Output() commentPosted = new EventEmitter();
	@Output() commentFailed = new EventEmitter();
	@Output() commentCanceled = new EventEmitter();
	errors: string[];
	commentBuffer: Comment = new Comment();

	constructor(
		private _comments: CommentService,
		private _auth: AuthService
	) {}

	postComment() {
		console.log(this.commentBuffer)
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

	ngOnInit() {
		this.commentBuffer.commentFrom = this._auth.userID();
		this.commentBuffer.commentOn = this.commentOn;
	}
	ngAfterViewInit() {
		this.postCommentInput.nativeElement.focus()
	}
}
