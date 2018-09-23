import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';

import { User } from 'classes/user';
import { Message } from 'classes/message';

@Component({
	templateUrl: './show-user.component.html'
})
export class ShowUserComponent implements OnInit, OnDestroy {
	user: User;
	isFriend: boolean;
	private _sub: any;
	constructor(
		private _route: ActivatedRoute,
		private _users: UserService,
		private _auth: AuthService
	) {}

	showNewMessage(message) {
		this.user.messages.push(message);
	}

	removeDeletedMessage(m_id) {
		this.user.messages.splice(this.user.messages.findIndex(message => {
			return (message as Message)._id.toString() === m_id;
		}), 1);
	}

	ngOnInit() {
		this.user = new User();
		this._sub = this._route.params.subscribe(params => {
			this._users.show(params['id'])
				.then(user => {
					this.user = user;
					console.log(user)
					console.log(user.friends.findIndex(x => {
						return x === this._auth.userID();
					}) >= 0);
					this.isFriend = user.friends.findIndex(x => x === this._auth.userID()) >= 0;
				})
				.catch(console.log);
		});
	}
	ngOnDestroy() {
		this._sub.unsubscribe();
	}
}
