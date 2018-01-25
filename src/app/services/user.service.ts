import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'classes/user';
import { Message } from 'classes/message';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
	constructor(
		private _http: Http
	){}
	
	index(): Promise<any>{
		return this._http.get('/api/users')
			.map(data => data.json())
			.toPromise();
	}
	
	show(id: string): Promise<any>{
		return this._http.get(`/api/users/${id}`)
			.map(data => data.json())
			.toPromise();
	}

	sendMessage(user_id: string, message: Message): Promise<any>{
		return this._http.put(`/api/users/messages/${user_id}`, message)
			.map(data => data.json())
			.toPromise();
	}
}
