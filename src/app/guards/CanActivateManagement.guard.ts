import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthUserService } from '../services/auth/authUser.service';

@Injectable()
export class CanActivateManagementGuard implements CanActivate {

    constructor(private router: Router, private authUser: AuthUserService) {}

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        try {
            if (this.authUser.getProfile() != null) {
                switch (this.authUser.getProfile()) {
                    case this.authUser.getKeyName('CRIS2_ROOT'):
                    case this.authUser.getKeyName('CRIS2_MANAGER'):
                        return true;
                        break;
                    default:
                        sessionStorage.clear();
                        console.log('No estás logueado 1');
                        this.router.navigate(['/']);
                }
            } else {
                sessionStorage.clear();
                console.log('No estás logueado 2');
                this.router.navigate(['/']);
            }
        } catch (ex) {
            sessionStorage.clear();
            console.log('No estás logueado 3');
            console.log(ex);
            this.router.navigate(['/']);
        }
    }
}
