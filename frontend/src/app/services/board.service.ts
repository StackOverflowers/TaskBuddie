import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerBoard(board: any) {
    return this._http.post<any>(this.env + 'board/registerBoard', board);
  }

  listBoard() {
    return this._http.get<any>(this.env + 'board/listBoard');
  }

  listMember(board: any) {

    return this._http.get<any>(this.env + 'board/listMember/' + board._id );

  }

  listBoardMember() {
    return this._http.get<any>(this.env + 'board/listBoardMember' );
  }

  addMember(board: any) {
    return this._http.put<any>(this.env + 'board/addMember', board);
  }


  deleteMember(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteMember/' + board._id);
  }

  deleteBoard(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteBoard/' + board._id);
  }


}
