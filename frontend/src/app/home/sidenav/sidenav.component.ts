import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { UserService } from "../../services/user.service";
>>>>>>> dev

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
<<<<<<< HEAD

  constructor() { }

  ngOnInit(): void {
  }

=======
  public userData:any;
  constructor(public _userService: UserService) {
    this.userData = {}
   }

  ngOnInit(): void {
    this._userService.getProfile().subscribe(
      (res)=>{
        this.userData = res.user;
        console.log(this.userData);
      },
      (err)=>{
        console.log(err)
      }
    )
  }



>>>>>>> dev
}
