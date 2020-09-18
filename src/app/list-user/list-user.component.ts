import { Component, OnInit, Inject} from '@angular/core';
import { first } from 'rxjs/operators';
import {Router} from "@angular/router";
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  constructor(private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    console.log(this.authenticationService.currentUserValue)
      // redirect to login
      if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/login']);
      }

      if (this.authenticationService.currentUserValue.role_id == 0){
        this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(user: User): void {
    let userId = user;
    this.userService.delete(+userId)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        window.location.reload();
        this.router.navigate(['list']);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.toString()); //user.id.toString()
    this.router.navigate(['edit']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
