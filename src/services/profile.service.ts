import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService {
	constructor(
		private _http: Http
	){}
	show(id){
		return this._http.get(`/api/profiles/${id}`)
			.map(data => data.json())
			.toPromise()
	}
}
