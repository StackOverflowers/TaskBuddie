import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css']
})
export class ListBoardComponent implements OnInit {
<<<<<<< HEAD
  taskData: any;
=======
  boardData: any;
  memberData: any;
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
  ) {
<<<<<<< HEAD
    this.taskData = {};
=======
    this.boardData = {};
    this.memberData = {};
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  }

  ngOnInit(): void {
    this._boardService.listBoard().subscribe(
      (res) => {
<<<<<<< HEAD
        this.taskData = res.board;
=======
        this.boardData = res.board;
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

<<<<<<< HEAD

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
=======
  listmember(board: any){
    console.log(board);    
    this._boardService.listMember(board).subscribe(
      (res) => {
        
        this.memberData = res.members;
        console.log(this.memberData);
        
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }
  


  deleteBoard(board: any) {
    this._boardService.deleteBoard(board).subscribe(
      (res) => {
        let index = this.boardData.indexOf(board);
        if (index > -1) {
          this.boardData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  }
  

<<<<<<< HEAD
=======
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
