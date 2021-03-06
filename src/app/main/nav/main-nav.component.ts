import { Component} from '@angular/core';

import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
	constructor(
		private _auth: AuthService
	) {}
}
