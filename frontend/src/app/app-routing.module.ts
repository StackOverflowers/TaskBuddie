import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { SaveBoardComponent } from './board/save-board/save-board.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
=======
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'registerUser', component: RegisterComponent },
<<<<<<< HEAD
  { path: 'signUp', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listUser', component : ListUserComponent},
  { path: 'registerRole', component : RegisterRoleComponent},
  { path: 'updateRole', component : UpdateRoleComponent},
  { path: 'updateUser', component : UpdateUserComponent},
  { path: 'listRole', component : ListRoleComponent},
  { path: 'listTask', component : ListTaskComponent},
  { path: 'saveTask', component : SaveTaskComponent},
  { path: 'saveBoard', component : SaveBoardComponent},
  { path: 'listBoard', component : ListBoardComponent},
   
=======
  { path: 'login', component: LoginComponent },
  
 
>>>>>>> ef4f91b8044e31908c59b791082523de9c0ec1cd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
