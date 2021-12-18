import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ProfileManagerService } from '../services/profile-manager.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _profileManager: ProfileManagerService,
        private _router: Router,
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this._profileManager.userToken){
            return true;
        }

        this._router.navigate(['cabinet', 'login'])

        return !!this._profileManager.userToken;
    }
}
