import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';

const API : string = "http://localhost:8080/lunchtime";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  token: string | null = null;
  users: any[] = [];
  public user: User | null = null;


  constructor(private http: HttpClient, private auth: AuthService, private oneuser: UserService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    if(localStorage.getItem("Authorization")) {
      this.token = localStorage.getItem("Authorization");
      let options = {
        headers : { "Authorization" : this.token }
      };
      this.http.get(API + '/user/findall', options)
      .subscribe((res : any) => {
        this.users = res;
      });
    }
  }

  creditOneUser(id: any, amount: any){
    this.oneuser.creditUser(id, amount).subscribe((res: any) => {
      console.log(res);
      this.updateWallet(id, amount);
      }
    );
  }

  updateWallet(id: any, amount: any){
    this.users.forEach((user: User) => {
      if (user.id === id) {
        let newWallet: string = "";
        newWallet = (user.wallet + parseFloat(amount)).toFixed(2);
        user.wallet = parseFloat(newWallet);
      }
    });
  }

}


