import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'classes/user';
import { AuthService } from 'app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [`
		.input-row {
			margin-bottom: 5px;
		}
	`]
})
export class LoginComponent implements OnInit {
	user: User;
	serverErrors: Array<string>;
	constructor(
		private _auth: AuthService,
		private _router: Router
	) {}

	login() {
		this._auth.login(this.user)
			.then(user => {
				this._router.navigate(['/dashboard']);
			})
			.catch(errorResponse => {
				this.serverErrors = errorResponse.json();
			});
	}

	ngOnInit() {
		this.user = new User();
		this.serverErrors = [];
	}
}
