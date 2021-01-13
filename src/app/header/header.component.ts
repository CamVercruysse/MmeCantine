import { Component, OnInit } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

const HELPER = new JwtHelperService();


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser: User | null;
  public isLunchLady: boolean;

  constructor( private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.isConnected();    
    
    
  }

  isConnected() {
    if(localStorage.getItem("Authorization")){
      let decodeToken = HELPER.decodeToken(localStorage.getItem("Authorization"));
      this.currentUser = decodeToken.user;
      // console.log(this.isLunchLady);
      //console.log(this.authService.isLunchLady);
      console.log(this.currentUser.isLunchLady);
      
      // this.isLunchLady = this.authService.currentUser.isLunchLady == true
      return this.currentUser;
    } else {
      // this.currentUser = null;
      return false;
    }
  }

  logout(): void {
    this.authService.signout();
  };
  
}
