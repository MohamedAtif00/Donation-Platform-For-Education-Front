import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../main/home/home.component';
import { MaterialListComponent } from '../main/material-list/material-list.component';
import { AboutComponent } from '../main/about/about.component';
import { DonationComponent } from '../main/donation/donation.component';
import { DonorCanActivate } from 'src/app/authentication/gaurd/donor-canactivate.gaurd';
import { MaterialCreationComponent } from '../main/donation/material-creation/material-creation.component';
import { MaterialDetailsComponent } from '../main/material-details/material-details.component';

const routes:Routes = [
  {path:'',component:MainComponent,children:[
    {path:'',component:HomeComponent},
    {path:'material-list',component:MaterialListComponent},
    {path:'material-list/:id',component:MaterialListComponent},
    {path:'about',component:AboutComponent},
    {path:'donation',component:DonationComponent,canActivate:[DonorCanActivate],children:[
      {path:'',component:MaterialCreationComponent}
    ]},
    {path:'material-details/:id',component:MaterialDetailsComponent}
  ]}
]
//
@NgModule({
  declarations: [],
  imports: [  
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class StudentRoutingModule { }
