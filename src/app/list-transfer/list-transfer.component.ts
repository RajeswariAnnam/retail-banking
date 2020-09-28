import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from "@angular/router";
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-transfer.component.html',
  styleUrls: ['./list-transfer.component.css']
})
export class ListTransferComponent implements OnInit {
  users: User[] = [];
  constructor(private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    console.log(this.authenticationService.currentUserValue)
    // redirect to login
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }

    }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    this.userService.getTrans(+userId).pipe(first()).subscribe(users => {
      this.users = users;
    });

  }

  exportTrans(id: number) {
    this.userService.export(id).subscribe(() => {
      this.loadAllTrans()
    });
  };
  private loadAllTrans() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  backUser(): void {
    this.router.navigate(['/']);
  };
}
