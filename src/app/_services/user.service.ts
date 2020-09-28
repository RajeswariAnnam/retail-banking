import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    baseUrl = 'http://localhost/retail-banking/api';
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
    transfer(user: User) {
        return this.http.post(`${this.baseUrl}/transfer.php`, user);
    }
    getTrans(id: number) {
        return this.http.get<User[]>(`${this.baseUrl}/transferlist.php?id=${id}`);
    }
    getAccountById(id: number) {
        return this.http.get<User[]>(`${this.baseUrl}/getAccount.php?id=${id}`);
    }
    export(id: number) {
        return this.http.get(`${this.baseUrl}/export.php?id=${id}`);
    }
    search(user: User) {
        return this.http.post(`${this.baseUrl}/insertRegis.php`, user);
    }

}
