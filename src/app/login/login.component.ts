import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    // Role
    Roles: any[] = [
        { rid: '0', Name: 'User' },
        { rid: '1', Name: 'Admin' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            role: ['0', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.submitted = true;
        //console.log(this.loginForm.value);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.userlogin(this.f.username.value, this.f.password.value, this.f.role.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (this.f.role.value == 1) {
                        this.router.navigate(['/list']);
                    } else {
                        this.router.navigate(['/']);
                    }
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                    //console.log(error);
                    this.alertService.error('Login failed.Incorrect Username or Password.');
                    this.loading = false;
        });
    }
}
