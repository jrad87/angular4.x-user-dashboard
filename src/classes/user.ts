import { Message } from './message';
import { FriendRequest } from './friend-request';
export class User {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	messages: Array<Message | string>;
	friends: Array<User | string>;
	blockedBy: Array<User | string>;
	friendRequests: Array<FriendRequest | string>;
}
