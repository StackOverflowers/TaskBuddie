import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-board-member',
  templateUrl: './list-board-member.component.html',
  styleUrls: ['./list-board-member.component.css']
})
export class ListBoardMemberComponent implements OnInit {
  memberData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
  ) {
    this.memberData = {};
  }

  ngOnInit(): void {
    this._boardService.listBoardMember().subscribe(
      (res) => {
        this.memberData = res.board.members;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }


  deleteTask(task: any) {
    this._boardService.deleteMember(task).subscribe(
      (res) => {
        let index = this.memberData.indexOf(task);
        if (index > -1) {
          this.memberData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
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
