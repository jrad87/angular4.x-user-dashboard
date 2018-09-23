import { Injectable } from '@angular/core';
import { CanActivate,
		 CanActivateChild,
		 Router,
		 ActivatedRouteSnapshot,
		 RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class OuterAuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private _router: Router,
		private _auth: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.checkAuth();
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	checkAuth() {
		if (!this._auth.isAuthed()) {
			return true;
		}
		this._router.navigate(['/dashboard']);
		return false;
	}
}
