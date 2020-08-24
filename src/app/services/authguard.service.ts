import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AppService } from "./app.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private _appService: AppService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._appService.getResult().status) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}