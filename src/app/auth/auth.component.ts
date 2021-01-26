
import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  token: string | null = "";
  public currentUser: User | null;
  public isLunchLady: boolean;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(this.checkStatus) {
      this.token;
    }   
  }

  login() {
    this.authService.auth();
    localStorage.setItem("Authorization", this.token);

  }

  checkStatus() {
    if (localStorage.getItem("Authorization")){
      return true;
    } else {
      return false;
    }
  }

  }



