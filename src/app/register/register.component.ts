﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    // Account types
    AccTypes: any[] = [
        { accid: 'saving', Name: 'Saving' },
        { accid: '', Name: 'Current' }
    ];
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
       /* if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            mobile: ['', [Validators.required, Validators.minLength(10)]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            pincode: ['', [Validators.required, Validators.minLength(6)]],
            account: ['', Validators.required],
            branch: ['', Validators.required],
            acctype: ['saving', Validators.required]

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
           // console.log(this.registerForm.value);
            return;
        }

        console.log(this.registerForm.value);

        this.loading = true;
        this.userService.register(this.registerForm.value)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/list']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
