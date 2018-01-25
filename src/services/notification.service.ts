import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable() 
export class NotificationService {
	
	socket;
	
	triggerTimeout(){
		this.socket.emit('triggerTimeout', null);
	}

	testSocket(){
		this.socket.emit('testSocket');
	}

	connectUser(userId){
		this.socket.emit('userConnected', userId);
	}

	logoutUser(userId){
		this.socket.emit('userLogout')
	}

	connection(){
		let observable = new Observable( observer => {
			this.socket = io('http://localhost:8000');
			this.socket.on('testProcess', () => {
				console.log('This part works');
			})
			this.socket.on('timeoutOccurred', (data) => {
				observer.next(data)
			})
			
			return () => {
				this.socket.disconnect();
			};
		});
		return observable;
	}
}
