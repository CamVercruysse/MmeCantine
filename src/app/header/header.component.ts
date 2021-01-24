import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../shared/models/user';

const HELPER = new JwtHelperService();


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser: User | null;
  public isLunchLady: boolean;
  public isMobile: boolean;
  public menuResponsive: boolean;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.isConnected();
    if (window.screen.width < 960) {
      this.isMobile = true;
    }
    console.log(this.isMobile);
    
  }

  isConnected() {
    if(localStorage.getItem("Authorization")){
      let decodeToken = HELPER.decodeToken(localStorage.getItem("Authorization"));
      this.currentUser = decodeToken.user;
      return this.currentUser;
    } else {
      return false;
    }
  }

  logout(): void {
    this.authService.signout();
  };

  showMenu(){ 
    this.menuResponsive = true;
  }
  hideMenu(){ 
    this.menuResponsive = false;
  }

  
}
