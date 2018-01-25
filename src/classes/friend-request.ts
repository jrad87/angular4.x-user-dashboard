import { User } from './user';
export class FriendRequest{
	_id: string;
	requester: User | string;
	requestee: User | string;
}
