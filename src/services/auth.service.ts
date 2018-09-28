import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { User } from 'classes/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService{	
	constructor(
		private _http: Http,
		private _cookies: CookieService
	){}
	
	isAuthed() {
		let userID = this._cookies.get('userID');
		let session = this._cookies.get('currentUser');
		let expiration = parseInt(this._cookies.get('expiration'));
		return (userID && session && expiration && (expiration > Date.now()));
	}
	userID() {
		return this._cookies.get('userID');
	}
	
	register(user: User): Promise<any>{
		return this._http.post('/api/auth/register', user)
			.map(data => data.json())
			.toPromise();
	}

	login(user: User): Promise<any>{
		return this._http.post('/api/auth/login', user)
			.map(data => data.json())
			.toPromise();
	}
	
	logout(): Promise<any>{
		return this._http.delete('/api/auth/logout')
			.map(data => data.json())
			.toPromise();
	}
}
