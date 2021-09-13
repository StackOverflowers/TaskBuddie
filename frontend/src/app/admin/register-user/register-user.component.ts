import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerData: any;
  roleData:any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPostion: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.message = '';
  }

  ngOnInit(): void {
    this._roleService.listRole().subscribe(
      (res) =>{
        this.roleData = res.role;
      },
      (err)=>{
        this.message = err.error;
        this.openSnackBarError();
      }
    )
  }

  registerAdmin() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password ||
      !this.registerData.roleId
    ) {
      console.log('Failed process: Incomplete data');
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
      this.registerData = {} ;
    } else {
      this._userService.registerAdmin(this.registerData).subscribe(
        (res) =>{
          console.log(res);
          this._router.navigate(['/listUser']);
          this.message = 'Successfull user registration';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) =>{
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      )   
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message ,'X' , {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPostion,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue']
    })
  }

  openSnackBarError() {
    this._snackBar.open(this.message ,'X' , {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPostion,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse']
    })
  }
}

