import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationService {

	private socket;
	private url = 'http://localhost:8000'

	triggerTimeout() {
		this.socket.emit('timeouts::triggerTimeout', null);
	}

	connectUser(userId) {
		this.socket.emit('timeouts::userConnected', userId);
	}

	logoutUser(userId) {
		this.socket.emit('timeouts::userLogout')
	}

	timeoutAll() {
		this.socket.emit('timeouts::timeoutAll')
	}

	connection(inputData) {
		return new Observable( o => {
			this.socket = io(this.url)
			this.socket.on('timeouts::timeoutOccurred', (data) => {
				o.next(data);
			})

			return () => {
				this.socket.disconnect();
			};
		});
	}
}
