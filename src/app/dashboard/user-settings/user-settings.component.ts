import { Component } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';
import { User } from 'classes/user';
 
@Component({
    selector: 'app-user-settings',
    template: `
        <div>
            <h2>User Settings</h2>
            <h3>Blocked users</h3>
            <table>
                <thead>

                </thead>
                <tbody>
                    <tr *ngFor="let user of blockedUsers">
                        <td>{{user.firstName}} {{user.lastName}}</td>
                        <td><button (click)="unblockUser(user._id)">Unblock</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}) 
export class UserSettingsComponent {
    blockedUsers : User[];
    constructor(
        private _auth: AuthService,
        private _users: UserService
    ) {}
    
    unblockUser(blockedUserId) {
        this._users.unblock(this._auth.userID(), blockedUserId)
            .then(userWithUpdatedList => {
                this.blockedUsers = userWithUpdatedList.blocked;
            })
            .catch(console.log)
    }

    ngOnInit() {
        this._users.getBlockedList(this._auth.userID())
            .then(user => this.blockedUsers = user.blocked);
    }
    
}