import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationService {

	socket;

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

	connection() {
		const observable = new Observable( observer => {
			this.socket = io('http://localhost:8000')
			this.socket.on('timeouts::testProcess', () => {
				console.log('This part works');
			})

			this.socket.on('timeouts::timeoutOccurred', (data) => {
				console.log(data)
				observer.next(data)
			})

			return () => {
				this.socket.disconnect();
			};
		});
		return observable;
	}
}
