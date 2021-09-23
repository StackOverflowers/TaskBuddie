import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { BoardService } from '../../services/board.service';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-revokeassignment',
  templateUrl: './revokeassignment.component.html',
  styleUrls: ['./revokeassignment.component.css'],
})
export class RevokeassignmentComponent implements OnInit {
  public boardData: any;
  public message: string;
  public search: any;
  public taskData: any;
  public userData: any;
  public asigned: any;
  public registerData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _taskService: TaskService,
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
  ) {
    this.boardData = {};
    this.message = '';
    this.search = {};
    this.taskData = [];
    this.userData = {};
    this.registerData = {};
    this.asigned = [];
  }

  ngOnInit(): void {
    this.getBoards();
  }

  alert() {
    if (!this.registerData._idUser || !this.registerData._idTask) {
      this.message = 'Failed process please check all the camps';
      this.openSnackBarError();
    } else {
      Swal.fire({
        title: 'Are you sure you want to unsubscribe the task?',
        text: 'The task will be assigned to the administrator and then assigned to a board member.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, unsubscribe!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this._taskService.UnassignTask(this.registerData).subscribe(
            (res) => {
              Swal.fire(
                'unsubscribed!',
                'Your file has been unsubscribe.',
                'success'
              );
              this.listAssigned();
            },
            (err) => {
              this.message = err.error;
              Swal.fire(this.message, 'Cant unsubscribe the task', 'error');
              console.log(err.error);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'You cancell the process have a nice day',
            'error'
          );
        }
      });
    }
  }

  getBoards() {
    this._boardService.listBoard().subscribe(
      (res) => {
        this.boardData = res.board;
      },
      (err) => {
        this.message = err.error;
      }
    );
  }

  listme() {
    this._taskService.getTaskMemeber(this.search).subscribe((res) => {
      this.userData = res;
    });
  }

  listAssigned() {
    this._taskService.Unasign(this.registerData).subscribe(
      (res) => {
        this.taskData = res.task;

        interface Task {
          name: string;
          _id: any;
          assigned: boolean;
        }

        function recibirDatos(task: Task[]) {
          let especifico: any;
          especifico = task.filter(({ assigned }) => {
            return assigned != false;
          });
          return especifico;
        }

        this.asigned = recibirDatos(this.taskData);
      },
      (err) => {
        this.message = err.error;
      }
    );
  }

  removeTask() {
    console.log(this.registerData);
    this._taskService.UnassignTask(this.registerData).subscribe(
      (res) => {
        this.listAssigned();
      },
      (err) => {
        console.log(err.error);
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
