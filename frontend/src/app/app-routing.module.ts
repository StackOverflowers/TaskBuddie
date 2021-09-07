import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListTaskComponent } from './task/list-task/list-task.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'registerUser', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listBoard', component: ListBoardComponent },
  { path: 'listTask', component: ListTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
