import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserBlockGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _http: Http 
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //console.log('In user block guard', route);
        return this.checkBlock();
    }
    checkBlock() {
        return this._http.post(`/api/users/${this._auth.userID()}/blockers`, {})
            .map(data => data.json())
            .toPromise()
            .then(notBlocked => notBlocked);
    }
}