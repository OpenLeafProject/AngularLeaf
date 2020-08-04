import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanActivateViaAuthGuard } from '../../guards/CanActivateViaAuth.guard';

import { MaterialModule } from '../common/material.module/material.module';
import { PrimengModule } from '../common/primeng-module/primeng.module';
import { AgePipeModule } from '../common/pipes/agepipe.module/agepipe.module';
import { RouterModule, Routes } from '@angular/router';

import { CoreDashboardComponent } from './core-dashboard/core-dashboard.component';
import { CorePatientSearchComponent } from './core-patient-search/core-patient-search.component';
import { CorePatientDetailComponent } from './core-patient-detail/core-patient-detail.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { BottomSheetOverviewActions } from './core-patient-detail/core-patient-detail-navactions';
import { CoreAddNoteComponent } from './core-add-note/core-add-note.component';

const routes: Routes = [
  {
    path: 'dashboard', component: CoreDashboardComponent,
    canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'patient/create', component: PatientCreateComponent,
    canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'patient/search', component: CorePatientSearchComponent,
    canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'patient/:nhc', component: CorePatientDetailComponent,
    canActivate: [CanActivateViaAuthGuard] 
  }

];

@NgModule({
  declarations: [
    CoreDashboardComponent,
    CorePatientSearchComponent,
    PatientCreateComponent,
    CorePatientDetailComponent,
    BottomSheetOverviewActions,
    CoreAddNoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PrimengModule,
    AgePipeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CanActivateViaAuthGuard
  ],
  exports: []
})
export class CoreModule { }
