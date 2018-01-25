import { User } from './user'; 
import { Message } from './message';
export class Comment {
	_id: string;
	text: string;
	commentFrom: User | string;
	commentOn: Message | string;
}
