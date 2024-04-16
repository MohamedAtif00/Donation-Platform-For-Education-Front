import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { RouterModule } from '@angular/router';
import { StudentRoutingModule } from './student-routing/student-routing.module';
import { HomeComponent } from './main/home/home.component';
import { FooterComponent } from './main/footer/footer.component';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
