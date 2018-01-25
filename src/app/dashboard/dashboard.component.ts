import { Component } from '@angular/core';

@Component({
	template: `
		<app-dashboard-nav></app-dashboard-nav>
		<div class="container">
			<router-outlet></router-outlet>
		</div>
	`
})
export class DashboardComponent {}
