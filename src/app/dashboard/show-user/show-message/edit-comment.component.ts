import {
    Component,
    EventEmitter,
    Input,
    Output,
    AfterViewInit,
    ElementRef,
    ViewChild
} from '@angular/core';
import { CommentService } from 'services/comment.service';
import { Comment } from 'classes/comment';

@Component({
    selector: 'app-edit-comment',
    template: `
        <div class="comment-container">
            <ul *ngIf="errors">
                <li *ngFor="let error of errors">{{error}}</li>
            </ul>
            <textarea
                #editCommentContainer
                [(ngModel)]="editCommentBuffer"
            ></textarea>
            <button (click)="cancelEditing()">Cancel</button>
            <button (click)="editComment()">Save</button>
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
export class EditCommentComponent implements AfterViewInit {

    @ViewChild('editCommentContainer')
    editCommentContainer: ElementRef;

    errors: string[] = [];
    editCommentBuffer: string = '';

    @Input() comment: Comment;
    @Output() cancelEdit = new EventEmitter();
    @Output() successfulEdit = new EventEmitter();

    constructor(
        private _comment: CommentService
    ) {}

    cancelEditing() {
        this.cancelEdit.emit();
    }

    editComment() {
        this._comment.editComment(this.comment, this.editCommentBuffer)
            .then(updatedMessage => this.successfulEdit.emit(updatedMessage))
            .catch(errorResponse => this.errors = errorResponse.json())
    }
    ngOnInit() {
        this.editCommentBuffer = this.comment.text;
    }
    ngAfterViewInit() {
        console.log(this.editCommentContainer);
        this.editCommentContainer.nativeElement.focus();
    }
}