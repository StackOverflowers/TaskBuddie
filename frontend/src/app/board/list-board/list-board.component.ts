import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { BoardService } from '../../services/board.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

=======
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css']
})
export class ListBoardComponent implements OnInit {
<<<<<<< HEAD
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
  ) {
    this.taskData = {};
  }

  ngOnInit(): void {
    this._boardService.listBoard().subscribe(
      (res) => {
        this.taskData = res.board;
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
=======

  constructor() { }

  ngOnInit(): void {
  }

}
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd
