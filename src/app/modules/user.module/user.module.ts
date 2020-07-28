import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../../interceptors/auth.interceptor';
// import { ErrorInterceptor } from '../../interceptors/error.interceptor';
// import { LoaderInterceptor } from '../../interceptors/loader.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserVerifyEmailComponent } from './user-verify-email/user-verify-email.component';
import { MaterialModule } from '../common/material.module/material.module';
import { CoreModule } from '../core.module/core.module';;

const routes: Routes = [
  {
    path: 'login', component: UserLoginComponent,
    // canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'register', component: UserRegisterComponent,
    // canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'forgot-password', component: UserForgotPasswordComponent,
    // canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'email-verify', component: UserVerifyEmailComponent,
    // canActivate: [CanActivateViaAuthGuard] 
  },

];

@NgModule({
  declarations: [
    UserLoginComponent,
    UserForgotPasswordComponent,
    UserRegisterComponent,
    UserVerifyEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  providers: [
  ]
})
export class UserModule { }
