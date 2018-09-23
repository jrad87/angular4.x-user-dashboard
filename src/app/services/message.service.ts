import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Message } from 'classes/message';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
	constructor(
		private _http: Http
	) {}
	postMessage(message: Message) {
		return this._http.post(`/api/messages/${message.messageTo}`, message)
			.map(data => data.json())
			.toPromise();
	}
	deleteMessage(id: string) {
		return this._http.delete(`/api/messages/${id}`)
			.map(data => data.json())
			.toPromise()
	}
	addComment(c_id: string, m_id: string) {
		console.log(c_id);
		return this._http.put(`/api/messages/${m_id}/comments`, {id: c_id})
			.map(data => data.json())
			.toPromise();
	}
}
