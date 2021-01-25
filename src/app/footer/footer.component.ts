import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../shared/models/user';
import { ContraintService } from '../shared/services/contraint.service';
import { Contraint } from '../shared/models/contraint.model';
import { Time } from '@angular/common';
import * as moment from 'moment';

const HELPER = new JwtHelperService();

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public currentUser: User | null;
  public isLunchLady: boolean;
  public endCommande = null

  constructor(private contraint: ContraintService) { }

  ngOnInit(): void {
    this.isConnected();
    this.getContraint()
  }

  isConnected() {
    if (localStorage.getItem("Authorization")) {
      let decodeToken = HELPER.decodeToken(localStorage.getItem("Authorization"));
      this.currentUser = decodeToken.user;
      return this.currentUser;

    } else {
      return false;
    }
  }

  public getContraint() {
    this.contraint.getContraint().subscribe((contraint: Contraint) => {
      this.endCommande = contraint.orderTimeLimit
      this.tempRestant(this.endCommande)
    })
  }

  public tempRestant(time) {
    // setInterval(() => {
    //   let now = moment().format("HH:mm:ss");

    //   let diff = moment.utc(moment(time, "HH:mm:ss").diff(moment(now, "HH:mm:ss"))).format("HH:mm:ss")

    //   this.endCommande = diff

    //   console.log(this.endCommande);

    // },1000)

    let now = moment().format("HH:mm:ss");

    if (time < now) {
      this.endCommande = null
    }
    else {
      let interval = setInterval(() => {
        let now = moment().format("HH:mm:ss");

        let diff = moment.utc(moment(time, "HH:mm:ss").diff(moment(now, "HH:mm:ss"))).format("HH:mm:ss")

        this.endCommande = diff

        if (time == now) {
          clearInterval(interval)  
          this.endCommande = null       
        }
        else{
          this.endCommande = diff
        }
       
      }, 1000)
    }
  }
}
