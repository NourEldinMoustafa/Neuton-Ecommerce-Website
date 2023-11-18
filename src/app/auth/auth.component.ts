import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private _AuthService: AuthService,
              private _Router: Router) {}
  value!: string;
  ngOnInit(): void {
    let container: any = document.querySelector('#container');
    let registerBtn: any = document.querySelector('#register');
    let loginBtn: any = document.querySelector('#login');

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }

  // Form to make login
  signInForm: FormGroup = new FormGroup({
    emailAddress: new FormControl(null),
    phone: new FormControl(null),
    password: new FormControl(null),
    rememberMe: new FormControl(true),
  });

  // Form to make register
  signUpForm: FormGroup = new FormGroup({
    userName: new FormControl(null),
    phone: new FormControl(null),
    emailAddress: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
  });

  signUp(body: any) {
    console.log(body.value);
    this._AuthService.regiter(body.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  signIn(body: any) {
    console.log(body.value);
    this._AuthService.login(body.value).subscribe(
      (res) => {
        console.log(res);
        if (res.token != '') {
          console.log(res.token)
          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userId', res.userId);
          this._AuthService.setUserData();
          this._Router.navigate(['/order']);

          //logout automatic 3 seconds after logging in
          // setTimeout(() => { this._AuthService.logout() } , 3000);
        }
        // token;
        // userId;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
