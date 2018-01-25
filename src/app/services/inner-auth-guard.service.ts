import { Injectable } from '@angular/core';
import { CanActivate,
		 Router,
		 RouterStateSnapshot,
		 ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class InnerAuthGuard implements CanActivate {
	constructor(
		private _auth: AuthService,
		private _router: Router
	){}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.checkAuth();
	}
	checkAuth(): boolean {
		if (this._auth.isAuthed()) {
			return true;
		}
		this._router.navigate(['/home']);
		return false;
	}
} 
