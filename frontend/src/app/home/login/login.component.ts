import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerData: any;
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
    this.registerData={};
  }

  ngOnInit(): void {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.loginData = {};
    } else {
      this._userService.login(this.loginData).subscribe(
        (res) => {
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/welcome']);
          this.getRole(this.loginData.email);
          this.getNombre(this.loginData.email);
          this.getId(this.loginData.email);
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

  getNombre(email: string) {
    this._userService.getNombre(email).subscribe(
      (res) => {
        localStorage.setItem('name', res.name);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  registerUser() {
    console.log(this.registerData)
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Complete all fields before trying to register';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._userService.registerUser(this.registerData).subscribe(
        (res) => {
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/welcome']);
          this.message = 'Successfull user registration';
          this.openSnackBarSuccesfull();
          this.getRole(this.loginData.email);
          this.getNombre(this.loginData.email);
          this.getId(this.loginData.email);
          this.registerData = {};
          //location.reload();
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  getId(email: string) {
    this._userService.getId(email).subscribe(
      (res) => {
        localStorage.setItem('_id', res._id);
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

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }
}