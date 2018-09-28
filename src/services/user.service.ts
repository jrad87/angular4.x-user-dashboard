import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'classes/user';
import { Message } from 'classes/message';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
	constructor(
		private _http: Http
	) {}

	index(): Promise<any> {
		return this._http.get('/api/users')
			.map(data => data.json())
			.toPromise();
	}

	show(id: string): Promise<any> {
		return this._http.get(`/api/users/${id}`)
			.map(data => data.json())
			.toPromise();
	}

	showObs(id: string): Observable<User> {
		return this._http.get(`/api/users/${id}`)
			.map(data => data.json())
	}

	block(userId: string, otherUserId: string): Promise<any> {
		return this._http.post(`/api/users/${otherUserId}/block`, {loggedInUserId: userId})
			.map(data => data.json())
			.toPromise()
	}

	unblock(userId: string, blockedUserId: string): Promise<any> {
		return this._http.post(`/api/users/${blockedUserId}/unblock`, {loggedInUserId: userId})
			.map(data => data.json())
			.toPromise();
	}

	getBlockedList(id: string): Promise<any> {
		return this._http.post(`/api/users/${id}/blocked`, {})
			.map(data => data.json())
			.toPromise()
	}

	getBlockerList(id: string): Promise<any> {
		return this._http.post(`/api/users/${id}/blockers`, {})
			.map(data => data.json())
			.toPromise()
	}

	sendMessage(user_id: string, message: Message): Promise<any> {
		return this._http.put(`/api/users/messages/${user_id}`, message)
			.map(data => data.json())
			.toPromise();
	}
}
