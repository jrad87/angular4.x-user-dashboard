import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'services/notification.service';

@Component({
	selector: 'app-dashboard-nav',
	template: `
		<nav>
			<div class="container">
				<div class="row">
					<div class="col-md-10">
						<h1 class="hero"><a routerLink="/dashboard">User Dashboard</a></h1>
						<a [routerLink]="['/dashboard/users/', currentUserID]">Profile</a>
					</div>
					<div class="col-md-2">
						<button (click)="logout()">Logout</button>
						<button (click)="testTimeout()">Test Timeout</button>
					</div>
				</div>
			</div>
		</nav>
	`,
	styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit, OnDestroy {
	connection;
	currentUserID: string;
	constructor(
		private _auth: AuthService,
		private _router: Router,
		private _notify: NotificationService
	) {}

	logout() {
		this._auth.logout()
			.then( () => {
				this._notify.logoutUser(this.currentUserID);
				this._router.navigate(['/home'])
			})
			.catch(console.log);
	}

	testTimeout() {
		this._notify.timeoutAll()
		// console.log('Button clicked');
	}

	ngOnInit() {
		this.currentUserID = this._auth.userID();
		this.connection = this._notify.connection().subscribe( () => {
			this.logout();
		});
		this._notify.connectUser(this.currentUserID);
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}
}
