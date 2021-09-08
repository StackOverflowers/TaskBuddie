import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
=======
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
<<<<<<< HEAD
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginData = {};
  }

  ngOnInit(): void {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
      this.loginData = {};
    } else {
      this._userService.login(this.loginData).subscribe(
        (res) => {
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/listBoard']);
          this.getRole(this.loginData.email);
          this.loginData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  getRole(email: string) {
    this._userService.getRole(email).subscribe(
      (res) => {
        localStorage.setItem('role', res.role);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
=======
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd
}
