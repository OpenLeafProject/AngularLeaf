import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanActivateViaAuthGuard } from '../../guards/CanActivateViaAuth.guard';

import { MaterialModule } from '../common/material.module/material.module';
import { PrimengModule } from '../common/primeng-module/primeng.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgePipeModule } from '../common/pipes/agepipe.module/agepipe.module';
import { RouterModule, Routes } from '@angular/router';

import { CoreDashboardComponent } from './core-dashboard/core-dashboard.component';
import { CorePatientSearchComponent } from './core-patient-search/core-patient-search.component';
import { CorePatientDetailComponent } from './core-patient-detail/core-patient-detail.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { BottomSheetOverviewActions } from './core-patient-detail/core-patient-detail-navactions';
import { CoreAddNoteComponent } from './core-add-note/core-add-note.component';
import { CoreCalendarComponent } from './core-calendar/core-calendar.component';
import { CoreWorklistComponent } from './core-worklist/core-worklist.component';
import { CoreCalendarAddEventDialog } from './core-calendar/core-calendar-add-event/core-calendar-add-event';


import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import listPlugin from '@fullcalendar/list';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGrigPlugin,
  interactionPlugin,
  listPlugin
]);

const routes: Routes = [
  {
    path: 'dashboard', component: CoreDashboardComponent,
    canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'calendar', component: CoreCalendarComponent,
    canActivate: [CanActivateViaAuthGuard] 
  },
  {
    path: 'worklist', component: CoreWorklistComponent,
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
    CoreAddNoteComponent,
    CoreCalendarComponent,
    CoreWorklistComponent,
    CoreCalendarAddEventDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PrimengModule,
    AgePipeModule,
    FullCalendarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CanActivateViaAuthGuard
  ],
  exports: []
})
export class CoreModule { }
