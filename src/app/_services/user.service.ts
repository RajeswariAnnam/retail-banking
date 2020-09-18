import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    baseUrl = 'http://localhost/angular/master/api';
    users: User[];
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}/userlist.php`);
    }

    getUserById(id: number) {
        return this.http.get<User[]>(`${this.baseUrl}/getuser.php?id=${id}`);
    }

    update(user: User) {
        return this.http.post(`${this.baseUrl}/userupdate.php?id=${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/userdelete.php?id=${id}`);
    }

    register(user: User){
        return this.http.post(`${this.baseUrl}/insertRegis.php`,user);
  }

}
