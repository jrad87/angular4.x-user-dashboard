import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'classes/user';
import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styles: [`
		.input-row {
			margin-bottom: 5px;
		}
	`]
})
export class RegistrationComponent implements OnInit{
	user: User;
	serverErrors: Array<string>;
	constructor (
		private _auth: AuthService,
		private _router: Router
	){}

	register() {
		this._auth.register(this.user)
			.then( () => {
				this._router.navigate(['/dashboard']);
			})
			.catch( errorResponse => {
				this.serverErrors = errorResponse.json();
			});
	}

	ngOnInit(){
		this.user = new User();
		this.serverErrors = []
	}
}
