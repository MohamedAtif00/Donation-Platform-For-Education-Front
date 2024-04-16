import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../main/home/home.component';

const routes:Routes = [
  {path:'',component:MainComponent,children:[
    {path:'',component:HomeComponent}
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class StudentRoutingModule { }
