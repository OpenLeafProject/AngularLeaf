import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/authUser.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.sass'],
  providers: [FormBuilder, LoginService]
})
export class UserLoginComponent implements OnInit {

  displayMessage = '';
  loginError = '';
  checkingLogin: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private authUser: AuthUserService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  hidePassword: any = true;

  ngOnInit() {
    /*
    this.afAuth.user.subscribe(user => ({
      if(user) {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        })
      }
    }));
    */
  }

  
  login() {
    this.loginError = null;
    this.checkingLogin = true;
    this.loginService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(
      response => {
        const token = response.token;
        const user = response.user;
        if (token != null && token.length > 0) {

          const keyName = 'token_' +  user;
          const md5 = new Md5();
          const hashed = md5.appendAsciiStr(keyName).end();

          this.authUser.setUser(user);
          this.authUser.setToken(token);

          this.loginService.getLoginProfile(token).subscribe(
            r => {
              this.authUser.setProfile(r.profile);
              this.router.navigate(['/console/dashboard']);
            }, error =>  {
              this.loginError = error.error;
              console.log(error);
              this.checkingLogin = false;
            });

        } else {
          this.loginError = response.error;
        }
        this.checkingLogin = false;
      }, error =>  {
        this.loginError = error.error;
        console.log(error);
        this.checkingLogin = false;
      });
  }
}
