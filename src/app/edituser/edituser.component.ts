import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { AlertService, UserService, AuthenticationService} from '@app/_services';

@Component({templateUrl: 'edituser.component.html'})
export class EdituserComponent implements OnInit {
    user: User[] = [];
    editForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {
        // redirect to login
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        let userId = window.localStorage.getItem("editUserId");
        if (!userId) {
            alert("Invalid action.")
            this.router.navigate(['list-user']);
            return;
        }
        this.editForm = this.formBuilder.group({
            id: [''],
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobile: ['', [Validators.required, Validators.minLength(10)]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            pincode: ['', [Validators.required, Validators.minLength(6)]],
            account: ['', Validators.required],
            branch: ['', Validators.required]

        });
        this.userService.getUserById(+userId)
            .subscribe(data => {
                this.editForm.setValue(data);
            });
    }

    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.editForm.invalid) {
            return;
        }

        //console.log(this.editForm.value);

        this.loading = true;
        this.userService.update(this.editForm.value)
        .subscribe(
            data => {
                this.alertService.success('User detail updated successful', true);
                this.router.navigate(['list']);
            },
            error => {
                this.alertService.error("Failed to update");
                this.loading = false;
            });
    }
}
