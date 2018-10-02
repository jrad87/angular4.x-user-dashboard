import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';
import { RealTimeService } from 'services/realtime.service'; 

import { User } from 'classes/user';
import { Message } from 'classes/message';

@Component({
	templateUrl: './show-user.component.html'
})
export class ShowUserComponent implements OnInit, OnDestroy {
	user: User;
	isFriend: boolean;
	isSelf: boolean;

	private _subscription;
	constructor(
		private _route: ActivatedRoute,
		private _users: UserService,
		private _auth: AuthService,
		private _realtime: RealTimeService
	) {}

	updateChanges() {
		this._realtime.changeOccurred();
	}

	showNewMessage(message) {
		this.user.messages.push(message);
		this.updateChanges()
	}

	removeDeletedMessage(m_id) {
		this.user.messages.splice(this.user.messages.findIndex(message => {
			return (message as Message)._id.toString() === m_id;
		}), 1);
		this.updateChanges();
	}

	private setIsFriend(user: User): void {
		this.isFriend = ( 0 <= user.friends.findIndex(x => x === this._auth.userID()));
	}

	ngOnInit() {
		this.user = new User();
		this._route.data.subscribe((data: {user: User}) => {
			this.user = data.user;
			this.setIsFriend(this.user);
			this.isSelf = (this.user._id === this._auth.userID());
		});

		this._subscription = this._realtime.connection().subscribe(() => {
			
			this._users.show(this.user._id)
				.then(user => {
					this.user = user
					this.setIsFriend(user);
				})
				.catch(console.log);
		});

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
		this._subscription.unsubscribe();
	}
}
