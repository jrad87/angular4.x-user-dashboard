import { Component } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-errors-nav',
	template: `
		<nav>
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1 class="hero"><a routerLink="/">User Dashboard</a></h1>
					</div>
				</div>
			</div>
		</nav>
	`,
	styles: [`
		nav {
			background-color: black;
			border-bottom: 2px solid #3f3f3f;
		}
	`]
})
export class ErrorsNavComponent {
	constructor(
		private _auth: AuthService
	) {}
}
