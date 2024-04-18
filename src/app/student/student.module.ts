import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { RouterModule } from '@angular/router';
import { StudentRoutingModule } from './student-routing/student-routing.module';
import { HomeComponent } from './main/home/home.component';
import { FooterComponent } from './main/footer/footer.component';
import { MaterialListComponent } from './main/material-list/material-list.component';
import { AboutComponent } from './main/about/about.component';
import { DonationComponent } from './main/donation/donation.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialCreationComponent } from './main/donation/material-creation/material-creation.component';
import { MaterialDetailsComponent } from './main/material-details/material-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MaterialListComponent,
    AboutComponent,
    DonationComponent,
    MaterialCreationComponent,
    MaterialDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class StudentModule { }
