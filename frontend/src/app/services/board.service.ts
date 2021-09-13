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

<<<<<<< HEAD
  addMember(board: any) {
    return this._http.put<any>(this.env + 'board/addMember', board);
  }
  
  registerMember(board: any) {
    return this._http.post<any>(this.env + 'board/registerMember/', board);
  }
=======
  listMember(board: any) {
      
    return this._http.get<any>(this.env + 'board/listMember/' + board._id );

  }

  listBoardMember() {
    return this._http.get<any>(this.env + 'board/listBoardMember' );
  }

  addMember(board: any) {
    return this._http.put<any>(this.env + 'board/addMember', board);
  }
   
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b

  deleteMember(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteMember/' + board._id);
  }

<<<<<<< HEAD

=======
  deleteBoard(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteBoard/' + board._id);
  }
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b

}
