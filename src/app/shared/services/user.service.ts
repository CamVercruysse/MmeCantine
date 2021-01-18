import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const API: string = "http://localhost:8080/lunchtime";
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,handler: HttpBackend, private auth: AuthService) {
    this.http = new HttpClient(handler);
   }

  public getCurrentUser() {
    if (localStorage.getItem('Authorization')) {
      let token = localStorage.getItem('Authorization');
      const decodedToken = HELPER.decodeToken(token);

      let user = decodedToken.user

      return user
    }
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(API + '/user/find/' + id);
  }
}
