import { Component, OnInit } from '@angular/core';

import { User } from 'classes/user';
import { FriendRequest } from 'classes/friend-request';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';
import { FriendService } from 'services/friend.service';

@Component({
	templateUrl: './all-users.component.html'
})
export class AllUsersComponent implements OnInit {
	currentUser: User;
	currentUsersFriends: User[] = [];
	otherUsers: User[] = [];
	constructor(
		private _auth: AuthService,
		private _users: UserService,
		private _friends: FriendService
	){}
	partitionUsers (users: User[]): void{
		this.currentUser = users.find(user => user._id === this._auth.userID());
		this.currentUsersFriends = users.filter(user => {
			return this.currentUser.friends.find(friend => {
				if ((<User>friend)._id)	{
					return (<User>friend)._id.toString() === user._id.toString();
				}
				return friend.toString() === user._id.toString();
			});
		})
		this.otherUsers = users.filter(user => {
			return (user._id !== this.currentUser._id) && (!this.currentUsersFriends.includes(user));
		}).map( user => {
			let request = user.friendRequests.find(friendRequest => {
				return (<FriendRequest>friendRequest).requester === (<User>this.currentUser)._id;
			});

			if (request) return Object.assign(user, {
				sentRequest: true, 
				requestId: (<FriendRequest>request)._id});

			request = user.friendRequests.find(friendRequest => {
				return (<FriendRequest>friendRequest).requestee === (<User>this.currentUser)._id;
			});
			
			if (request) return Object.assign(user, {
				receivedRequest: true, 
				requestId: (<FriendRequest>request)._id});
			return user;
		});
	}
	blockUser(){
		console.log('User blocked');
		//TODO
	}
	reportUser(){
		console.log('User reported');
	}
	unfriendUser(){
		console.log('User unfriended');
	}
	placeFriendRequest(requestee){
		this._friends.request((<User>this.currentUser)._id, requestee)
			.then( () => this._users.index())
			.then(users => this.partitionUsers(users))
			.catch(console.log);
	}
	acceptRequest(requestId){
		this._friends.acceptRequest(requestId)
			.then( () => this._users.index())
			.then(users => this.partitionUsers(users))
			.catch(console.log);
	}
	rejectRequest(requestId){
		this._friends.rejectRequest(requestId)
			.then(rejectedRequest => {
				this.currentUser = rejectedRequest.requestee;
				this.otherUsers[this.otherUsers.findIndex(user => {
					return user._id.toString() === rejectedRequest.requester._id.toString();
				})] = rejectedRequest.requester;
			})
			.catch(console.log);
	}
	cancelRequest(requestId){
		this._friends.cancelRequest(requestId)
			.then(canceledRequest => {
				this.currentUser = canceledRequest.requester;
				this.otherUsers[this.otherUsers.findIndex(user =>{
					return user._id.toString() === canceledRequest.requestee._id.toString();
				})] = canceledRequest.requestee;
			})
			.catch(console.log);
	}
	ngOnInit(){
		this.currentUser = new User();
		this._users.index()
			.then(users => this.partitionUsers(users))
			.catch(console.log);
	}
}
