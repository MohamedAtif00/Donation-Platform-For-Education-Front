import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { StudentListComponent } from './main/student-list/student-list.component';
import { DonorListComponent } from './main/donor-list/donor-list.component';
import { MaterialListComponent } from './main/material-list/material-list.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { RequestListComponent } from './main/request-list/request-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    StudentListComponent,
    DonorListComponent,
    MaterialListComponent,
    RequestListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
