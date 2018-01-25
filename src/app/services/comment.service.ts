import { Injectable} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Comment } from 'classes/comment';
import { Message } from 'classes/message';

@Injectable()
export class CommentService {
	constructor(
		private _http: Http
	){}	

	postComment(comment: Comment): Promise<Comment>{
		return this._http.post(`/api/comments/${comment.commentOn}`, comment)
			.map(data => data.json())
			.toPromise();
	}

	deleteComment(comment: Comment): Promise<Message>{
		return this._http.delete(`/api/comments/${comment._id}`)
			.map(data => data.json())
			.toPromise();
	}
	
}
