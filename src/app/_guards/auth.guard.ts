import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthenticationService } from '../../app/services/authntication.service';
import { Observable } from 'rxjs'
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(public authService: AuthenticationService,private router: Router) { }
	canActivate() {
        if (localStorage.getItem('token')) {
            var currentUser = localStorage.getItem('token');
            let token = currentUser;
            let decryptedToken = JSON.parse(window.atob(token.split('.')[1]));
            var exp_timestamp = decryptedToken.exp;
            var today_timestamp = Math.floor(new Date().getTime() / 1000)
            if (exp_timestamp < today_timestamp) {
                localStorage.removeItem('token')
                this.router.navigate(['authentication/login'])
                return false;
            }
            else {
                return true;
            }
        }
		return false;
		localStorage.removeItem('token')
		this.router.navigate(['authentication/login'])
		
    }



}