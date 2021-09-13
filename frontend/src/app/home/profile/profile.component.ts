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
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  boardData: any;
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  nombre: any;
  selectedFile: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _boardService: BoardService
  ) {
    this.userData = {};
    this.boardData = {};
    this.nombre = this._userService.nameIn();
    this.selectedFile = null;
  }

  ngOnInit(): void {
    this._userService.listUser(this.nombre).subscribe(
      (res) => {
        this.userData = res.users;
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

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  savePhoto(){
    const data = new FormData();
      if ( this.selectedFile != null){
       
        data.append('photo', this.selectedFile, this.selectedFile.name);
      }  
      this. _userService.updatePhoto(data).subscribe(
        (res) => {
          this._router.navigate(['/profile']);
          this.message = 'Updated photo';
          this.openSnackBarSuccesfull();
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
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
