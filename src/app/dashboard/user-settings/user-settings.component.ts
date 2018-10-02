import { Component, EventEmitter } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';
import { RealTimeService } from 'services/realtime.service';
import { User } from 'classes/user';
 
@Component({
    selector: 'app-user-settings',
    template: `
        <div>
            <h2>User Settings</h2>
            <h3>Blocked users</h3>
            
            <table *ngIf="blockedUsers.length; else noBlockedUsers">
                <thead>

                </thead>
                <tbody>
                    <tr *ngFor="let user of blockedUsers">
                        <td>{{user.firstName}} {{user.lastName}}</td>
                        <td><button (click)="unblockUser(user._id)">Unblock</button></td>
                    </tr>
                </tbody>
            </table>
            <ng-template #noBlockedUsers>
                <p>You have not blocked any users!</p>
            </ng-template>
        </div>
    `
}) 
export class UserSettingsComponent {
    private _subscription;

    blockedUsers : User[] = [];
    constructor(
        private _auth: AuthService,
        private _users: UserService,
        private _realtime: RealTimeService
    ) {}
    

    unblockUser(blockedUserId) {
        this._users.unblock(this._auth.userID(), blockedUserId)
            .then(userWithUpdatedList => {
                this.blockedUsers = userWithUpdatedList.blocked;
                this._realtime.changeOccurred();
            })
            .catch(console.log)
    }

    private setBlockedUsers() {
        this._users.getBlockedList(this._auth.userID())
            .then(user => {
                this.blockedUsers = user.blocked
            });    
    }

    ngOnInit() {
        this.setBlockedUsers();    
        this._subscription = this._realtime.connection().subscribe(() => {
            this._users.getBlockedList(this._auth.userID())
                .then(user => {
                    this.blockedUsers = user.blocked
                });
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}