import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(public authServ:AuthService,private router:Router){}

  Logout(){
    this.authServ.Logout();
    this.router.navigate([''])
  }
}
