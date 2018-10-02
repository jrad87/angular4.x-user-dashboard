import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class RealTimeService {
    private url = 'http://localhost:8000'
    private socket;

    changeOccurred() {
        this.socket.emit('realtime::changeOccurred')
    }

    connection() {
        return new Observable( o => {
            this.socket = io(this.url)

            this.socket.on('realtime::updateData', () => {
                o.next()
            })

            return () => {
                this.socket.disconnect();
            }
        })
    }
}