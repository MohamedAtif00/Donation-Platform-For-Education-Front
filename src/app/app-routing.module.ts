import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentModule } from './student/student.module';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./student/student.module').then(x=>x.StudentModule)},
  {path:'auth',loadChildren:()=>import('./authentication/authentication.module').then(x=>x.AuthenticationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
