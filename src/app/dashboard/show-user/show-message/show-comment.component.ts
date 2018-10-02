import { 
	Component,	
	OnInit, 
	Input, 
	Output, 
	EventEmitter,
	ViewChild,
	AfterViewChecked,
	ElementRef
} from '@angular/core';
import { Comment } from 'classes/comment';
import { User } from 'classes/user';
import { AuthService } from 'services/auth.service';
import { CommentService } from 'services/comment.service';

@Component({
	selector: 'app-show-comment',
	template: `
	<div class="comment-container"
		
		*ngIf="!isEditing">
		<h2>{{comment.commentFrom.username}} said ...</h2>
		<p>{{comment.text}}</p>
		<button
			*ngIf="hasEditPrivileges"
			(click)="toggleEditing()"
		>Edit</button>
		<button
			*ngIf="hasDeletePrivileges"
			(click)="deleteComment()"
		>Delete</button>
	</div>
	<app-edit-comment
		*ngIf="isEditing"
		[comment]="comment"
		(cancelEdit)="toggleEditing()"
		(successfulEdit)="editComment($event)">
	</app-edit-comment>
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
export class ShowCommentComponent implements OnInit, AfterViewChecked {
	
	@ViewChild('editCommentContainer')
	editCommentContainer: ElementRef;
	
	@Input() comment: Comment = new Comment();
	@Input() messageTo: string;
	@Output() messageChanged = new EventEmitter();

	hasDeletePrivileges = false;
	hasEditPrivileges = false;
	isEditing = false;

	editCommentBuffer = '';
	errors: string[] = [];

	displayErrors(errors: string[]) {
		this.errors = errors;
	}

	toggleEditing() {
		this.isEditing = !this.isEditing;
		this.isEditing ? this.editCommentBuffer = this.comment.text : ''
		//if(this.isEditing) console.log(this.editCommentContainer.nativeElement);
	}

	deleteComment() {
		this._comments.deleteComment(this.comment)
			.then(updatedMessage => {
				this.messageChanged.emit(updatedMessage);
			})
			.catch(console.log);
	}

	editComment(updatedMessage) {
		this.messageChanged.emit(updatedMessage);
	}

	constructor(
		private _comments: CommentService,
		private _auth: AuthService
	) {}

	ngOnInit() {
		if (this._auth.userID() === (this.comment.commentFrom as User)._id.toString()) {
			this.hasDeletePrivileges = true;
			this.hasEditPrivileges = true;
		}
		else if (this._auth.userID() === this.messageTo) {
			this.hasDeletePrivileges = true;
			this.hasEditPrivileges = false;
		}
	}
	ngOnChanges() {
		console.log(this.editCommentContainer);
	}
	ngAfterViewChecked() {
		//console.log(this.editCommentContainer);
	}
	ngAfterViewInit() {
		//this.editCommentInput.nativeElement.focus();
	}
}
