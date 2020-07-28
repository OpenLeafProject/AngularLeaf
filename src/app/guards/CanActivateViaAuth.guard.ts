import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        try {
            if (sessionStorage.getItem('user') != null) {
                return true;
            } else {
                sessionStorage.clear();
                console.log('No estás logueado');
                this.router.navigate(['/']);
            }
        } catch (ex) {
            sessionStorage.clear();
            console.log('No estás logueado');
            this.router.navigate(['/']);
        }
    }
}
