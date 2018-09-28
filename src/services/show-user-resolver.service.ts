import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Injectable()
export class ShowUserResolver implements Resolve<User> {
    constructor(
        private _users: UserService,
        private _router: Router
    ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        let id = route.paramMap.get('id');
        return this._users.showObs(id).pipe(
            take(1),
            map(user => {
                if(user) {
                    return user;
                }
                else {
                    this._router.navigate(['/dashboard']);
                    return null;
                }
            })
        )
    }
}