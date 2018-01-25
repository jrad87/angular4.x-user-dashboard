import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'app/services/user.service';

import { User } from 'classes/user';
import { Message } from 'classes/message';

@Component({
	templateUrl: './show-user.component.html'
})
export class ShowUserComponent implements OnInit {
	user: User;
	private _sub: any;
	
	constructor(
		private _route: ActivatedRoute,
		private _users: UserService
	){}
	
	showNewMessage(message){
		this.user.messages.push(message);
	}	
	
	removeDeletedMessage(m_id){
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
				})
				.catch(console.log);
		});
	}
	ngOnDestroy() {
		this._sub.unsubscribe();
	}
}
