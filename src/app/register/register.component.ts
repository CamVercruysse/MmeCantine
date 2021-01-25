import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public formStringified;
  public formToJSON;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      address: ['', Validators.required],
      wallet: [0.0],
      postalCode: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      isLunchLady: [false],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4)],
      phone: ['', Validators.required],
      town: ['', Validators.required],
      sex: [0],
      status: [0],
      image: [null]
    });
  }

  register() {
    this.formStringified = JSON.stringify(this.form.value, null, 4);
    this.formToJSON = JSON.parse(this.formStringified);
    this.authService.addUser(this.formToJSON).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/connexion']);
    });
  }
}
