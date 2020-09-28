import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    isAdmin = false;
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService

    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
       // console.log(this.authenticationService.currentUserValue.role_id);
        if (this.authenticationService.currentUserValue.role_id == 1) {
            this.isAdmin = true;
        }
        console.log(this.authenticationService.currentUserValue);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    editUser(user: User): void {
        window.localStorage.removeItem("editUserId");
        window.localStorage.setItem("editUserId", user.toString()); //user.id.toString()
        this.router.navigate(['/edit']);
    };

    transfer(): void {
        this.router.navigate(['transfer']);
    };
}
