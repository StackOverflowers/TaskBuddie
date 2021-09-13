import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
<<<<<<< HEAD
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _userService: UserService) { }
=======
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _userService: UserService) {}
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
  intercept(req: any, next: any) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this._userService.getToken(),
      },
    });
    return next.handle(tokenReq);
<<<<<<< HEAD
}
}
=======
  }
}
>>>>>>> d2c4779c08fb5b1ad55c2bdf9f5d1380263f387b
