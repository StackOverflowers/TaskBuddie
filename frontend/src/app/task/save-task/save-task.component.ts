import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  public search: any;
  public userData: any;
  public boardData: any;
  public taskData: any;
  public array2: any;
  public name: any;
  public registerData: any;
  public selectedFile: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _boardService: BoardService,
    private _router: Router
  ) {
    this.userData = {};
    this.boardData = {};
    this.taskData = {};
    this.array2 = [];
    this.name = [];
    this.message = '';
    this.registerData = {};
    this.search = {};
    this.selectedFile = null;
  }

  ngOnInit(): void {
    this.getBoards();
  }

  listme() {
    this._taskService.getTaskForBoard(this.search).subscribe(
      (res) => {
        this.taskData = res.filter;
        console.log(this.taskData);
      },
      (err) => {
        console.log(err.error);
      }
    );

    this._taskService.getTaskMemeber(this.search).subscribe((res) => {
      this.userData = res;
   //   console.log(this.userData);
    });
  }

  getBoards() {
    this._boardService.listBoard().subscribe(
      (res) => {
        this.boardData = res.board;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  saveTask() {
    if (
      !this.registerData.name ||
      !this.registerData.description ||
      !this.registerData.score
    ) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      const data = new FormData();
      if (this.selectedFile != null) {
        data.append('image', this.selectedFile, this.selectedFile.name);
      }
      data.append('boardID', this.search.boardID);
      data.append('name', this.registerData.name);
      data.append('description', this.registerData.description);
      data.append('score', this.registerData.score);

   //   console.log(this.search.boardID);
      this._taskService.saveTask(data).subscribe(
        (res) => {
          this._router.navigate(['/asign']);
          this.message = 'Task create';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
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
