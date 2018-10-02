import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'classes/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FriendService {
	constructor(
		private _http: Http
	) {}
	
	request(requesterId, requesteeId){
		//console.log(requesterId, requesteeId);
		return this._http.post(`/api/users/${requesteeId}/friend`, {requester: requesterId})
			.map(data => data.json())
			.toPromise();
	}
	acceptRequest(requestId){
		return this._http.post(`/api/friends/${requestId}`, {})
			.map(data => data.json())
			.toPromise();
	}
	rejectRequest(requestId){
		return this._http.delete(`/api/friends/reject/${requestId}`)
			.map(data => data.json())
			.toPromise();
	}
	cancelRequest(requestId){
		return this._http.delete(`/api/friends/cancel/${requestId}`)
			.map(data => data.json())
			.toPromise();
	}
	unfriend(unfrienderId, unfriendeeId) {
		let friends = {
			unfriender : unfrienderId,
			unfriendee : unfriendeeId
		}
		return this._http.put('/api/friends/unfriend', friends)
			.map(data => data.json())
			.toPromise()
	}
}
