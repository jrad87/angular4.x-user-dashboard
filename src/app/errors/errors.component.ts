import { Component } from '@angular/core';

@Component({
	template: `
		<app-errors-nav></app-errors-nav>
		<div class="container">
			<router-outlet></router-outlet>
		</div>
	`
})
export class ErrorsComponent {}
