import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Injectable()
export class UserBlockGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('In user block guard', route);
        return this.checkBlock();
    }
    checkBlock() {
        return true;
    }
}