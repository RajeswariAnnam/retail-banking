import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { exit } from 'process';

@Component({ templateUrl: 'transfer.component.html' })
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  loading = false;
  submitted = false;
  // Account types
  AccTypes: any[] = [
    { accid: 'saving', Name: 'Saving' },
    { accid: 'current', Name: 'Current' }
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
    let userId = window.localStorage.getItem("editUserId");
    //console.log(userId);
    this.transferForm = this.formBuilder.group({

      account: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', Validators.required],
      balance: ['', Validators.required],
      id: ['', Validators.required],
      desc: ['', Validators.required]

    });
    this.userService.getAccountById(+userId)
      .subscribe(data => {
        this.transferForm.setValue(data);
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.transferForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.transferForm.invalid) {
      // console.log(this.registerForm.value);
      return;
    }

    console.log(this.transferForm.value);

    this.loading = true;
    this.userService.transfer(this.transferForm.value)
      .subscribe(
        data => {
          this.alertService.success('Transaction successful', true);
          this.router.navigate(['/list']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
