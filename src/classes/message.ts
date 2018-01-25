import { User } from './user';
import { Comment } from './comment';

export class Message {
	public _id: string;
	public text: string;
	public messageFrom: User | string;
	public messageTo: User | string;
	public comments: Array<Comment | string>;
}
