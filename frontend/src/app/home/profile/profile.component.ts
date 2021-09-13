import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent { 

  boardData: any; 
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  nombre : any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _boardService: BoardService,
  ) {
    this.userData = {};
    this.boardData = {};
    this.nombre =  this._userService.nameIn();
  }

  ngOnInit(): void {
    this._userService.getProfile().subscribe(
      (res) => {
        this.userData = res.user;  
        console.log(this.userData)
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
    this._boardService.listBoardMember().subscribe(
      (res) => {
        this.boardData = res.board;        
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }


  updateUser(user: any) {}


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
