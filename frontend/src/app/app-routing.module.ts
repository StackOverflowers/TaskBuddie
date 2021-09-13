import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListBoardMemberComponent } from './board/list-board-member/list-board-member.component';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { SaveBoardComponent } from './board/save-board/save-board.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
import { ProfileComponent } from './home/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'registerUser', component: RegisterUserComponent },
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
  { path: 'listBoardMember', component : ListBoardMemberComponent},
  { path: 'profile', component : ProfileComponent},

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
