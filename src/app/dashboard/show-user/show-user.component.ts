import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';

import { User } from 'classes/user';
import { Message } from 'classes/message';

@Component({
	templateUrl: './show-user.component.html'
})
export class ShowUserComponent implements OnInit, OnDestroy {
	user: User;
	isFriend: boolean;
	isSelf: boolean;
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
		this._route.data.subscribe((data: {user: User}) => {
			this.user = data.user;
			this.isFriend = ( 0 <= data.user.friends.findIndex(x => x === this._auth.userID()));
			this.isSelf = (this.user._id === this._auth.userID())
		})
		/*
		Old code before prefetching user data with route resolver:
		
		this._sub = this._route.params.subscribe(params => {
			this._users.show(params['id'])
				.then(user => {
					this.user = user;
					this.isFriend = user.friends.findIndex(x => x === this._auth.userID()) >= 0;
					return user._id
				})
				.then(id => {
					return this._users.getBlockerList(id)
				})
				.then(blockerList => console.log(blockerList))
				.catch(console.log);
		});
		*/
	}
	ngOnDestroy() {
		//this._sub.unsubscribe();
	}
}
