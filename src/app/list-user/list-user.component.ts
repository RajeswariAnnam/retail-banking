import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from "@angular/router";
import { DataTableDirective } from 'angular-datatables';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buttons-extension',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @ViewChild(DataTableDirective)
  //dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  users: User[] = [];
  constructor(private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    // redirect to login
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }

    if (this.authenticationService.currentUserValue.role_id == 0) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loadAllUsers();
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: [{
        extend: 'excel',
        exportOptions: {
          columns: [0, 1, 2]
        }
      }, {
        extend: 'csv',
        exportOptions: {
          columns: [0, 1, 2]
        }
      }],
    };
  }

  public loadAllUsers() {
    return this.userService.getAll().pipe(first()).subscribe(users => {
    //  console.log('----> user service : get all data', users);
      this.users = users;
      this.dtTrigger.next();
    });
  }

  deleteUser(user: User): void {
    let userId = user;
    this.userService.delete(+userId)
      .subscribe(data => {
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
    this.router.navigate(['register']);
  };
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
