import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from '../models/user';


const API : string = "http://localhost:8080/lunchtime";
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  credentials: Credentials = {
    email: "",
    password: ""
  };
  public currentUser: User = null;
  token: string | null = "";
  isLunchLady: boolean;


  constructor(
    private http: HttpClient,
  ) { }

  auth() {
    this.http.post(API + '/login', this.credentials, {observe: "response"})
    .subscribe((res : any) => {
      this.token = res.headers.get("Authorization");
      const decodedToken = HELPER.decodeToken(this.token);
      this.currentUser = decodedToken.user ;
      this.isLunchLady = this.currentUser.isLunchLady;

      localStorage.setItem("Authorization", this.token);
    });

  };

  signout(): void {
    localStorage.removeItem("Authorization");
    this.token = null;
  };

  addUser(form: any){
    return this.http.put(API + '/user/register', form);
  }




}
