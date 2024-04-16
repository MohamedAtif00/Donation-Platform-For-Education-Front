import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing/authentication-routing.module';
import { DonorLoginComponent } from './donor-login/donor-login.component';
import { DonorRegisterComponent } from './donor-register/donor-register.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    DonorLoginComponent,
    DonorRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
