import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userData: any;
  message: string = '';
  _id: string;
  newPass: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { 
    this.userData = {};
    this._id = '';
    this.newPass = '';
  }

  ngOnInit(): void {
  }


  updateUser() {
    if (!this.userData.name || !this.userData.email) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
    } else {
      this._userService.updateUser(this.userData).subscribe(
        (res) => {
          this._router.navigate(['/listUser']);
          this.message = 'Successfull edit user';
          this.openSnackBarSuccesfull();
          this.userData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

}
