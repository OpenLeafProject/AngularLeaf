import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDashboardComponent } from './core-dashboard/core-dashboard.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanActivateViaAuthGuard } from '../../guards/CanActivateViaAuth.guard';

import { MaterialModule } from '../common/material.module/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CoreNavbarComponent } from './core-navbar/core-navbar.component';


const routes: Routes = [
  {
    path: 'dashboard', component: CoreDashboardComponent,
    canActivate: [CanActivateViaAuthGuard] 
  }

];

@NgModule({
  declarations: [
    CoreDashboardComponent,
    CoreNavbarComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CanActivateViaAuthGuard
  ],
  exports: [
    CoreNavbarComponent
  ]
})
export class CoreModule { }
