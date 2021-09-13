import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }

  
  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

<<<<<<< HEAD
=======
  nameIn() {
    return localStorage.getItem('name');
  }

>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin' ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
<<<<<<< HEAD
=======
    localStorage.removeItem('name');
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
    this._router.navigate(['/login']);
  }

  getRole(email: string) {
    return this._http.get<any>(this.env + 'user/getRole/' + email);
  }

<<<<<<< HEAD
  listUser() {
    return this._http.get<any>(this.env + 'user/listUsers/' );
=======
  getNombre(email: string) {
    return this._http.get<any>(this.env + 'user/getNombre/' + email);
  }

  listUser(name: string) {
    return this._http.get<any>(this.env + 'user/listUsers/' + name);
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  }

  updateUser(user: any) {
    return this._http.put<any>(this.env + 'user/updateUser', user);
  }

  deleteUser(user: any) {
    return this._http.put<any>(this.env + 'user/deleteUser', user);
  }

  registerAdmin(user: any) {
    return this._http.post<any>(this.env + 'user/registerAdmin', user);
  }
<<<<<<< HEAD

  

=======
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
}
