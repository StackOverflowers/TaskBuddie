import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { UserService } from '../../services/user.service';
=======
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

<<<<<<< HEAD
  constructor(public _userService: UserService) { }
=======
  constructor() { }
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd

  ngOnInit(): void {
  }

}
