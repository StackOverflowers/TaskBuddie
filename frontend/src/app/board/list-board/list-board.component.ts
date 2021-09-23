import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css'],
})
export class ListBoardComponent implements OnInit {
  boardData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  public id: any;
  public user: any;

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) {
    this.boardData = [];
    this.id = {};
    this.user = {}
  }

  ngOnInit(): void {
    this.getProfile();
    this._boardService.listBoard().subscribe(
      (res) => {
        this.boardData = res.board;
        console.log(this.boardData.length)
        
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  getProfile(){
    interface User{
      name:string
    }

    this._userService.getProfile().subscribe(
      (res)=>{
        const user:User = res.user;
        this.user = user
        console.log(this.user)
      }
    )

  }

  deleteBoard(board: any) {
    Swal.fire({
      title: 'Are you sure you want to delete the board?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this._boardService.deleteBoard(board).subscribe(
          (res) => {
            let index = this.boardData.indexOf(board);
            if (index > -1) {
              this.boardData.splice(index, 1);
              this.message = res.message;
              this.openSnackBarSuccesfull();
              Swal.fire(this.message, 'Board Deleted.', 'success');
            }
          },
          (err) => {
            this.message = err.error;
            Swal.fire(this.message, 'Cant Delete the board', 'error');
            console.log(err.error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You cancel the process have a nice day',
          'error'
        );
      }
    });
  }
  updateBoard(board: any) {
    this._boardService.deleteBoard(board).subscribe(
      (res) => {
        let index = this.boardData.indexOf(board);
        if (index > -1) {
          this.boardData.splice(index, 1);
          this.message = res.message;
          Swal.fire(this.message, 'Board Updated.', 'success');
          this.openSnackBarSuccesfull();
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 800,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

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
