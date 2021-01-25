import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../shared/models/user';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  token: string | null = null;
  public user: User | null = null;
  public form: FormGroup;
  public formToJSON;
  public formStringified;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.getToken();
    this.user = this.userService.getCurrentUser();
    this.form = this.fb.group({
      address: ['', Validators.required], //
      postalCode: ['', Validators.required], //
      email: ['', Validators.required, Validators.email], //
      name: ['', Validators.required], //
      firstname: ['', Validators.required], //
      password: ['', Validators.required, Validators.minLength(4)], //
      phone: ['', Validators.required], //
      town: ['', Validators.required],
      sex: [this.user.sex],
      isLunchLady: [this.user.isLunchLady]
    });
  }

  getToken(){
    return this.token = localStorage.getItem("Authorization");
  }

  updateUser(id: any){
    this.formStringified = JSON.stringify(this.form.value, null, 4);
    this.formToJSON = JSON.parse(this.formStringified);
    this.userService.userUpdate(id, this.formToJSON).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/profile']);
    });
  }
}
