import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as globals from '../../app.globals';
import { Appointment } from '../../models/api/appointment.model';


// import 'rxjs/add/operator/retry'; // don't forget the imports


@Injectable()

export class AppointmentService {

  private G = globals;
  private backEndApi;

  constructor(private http: HttpClient) {

    this.backEndApi = this.G.backEndApi;
  }

  GetTodaysList() {
    return this.http.get(this.backEndApi + 'appointment/gettodayslist')
    .pipe(map((response: Appointment[]) => response));
  }

  GetFullCalendar() {
    return this.http.get(this.backEndApi + 'appointment/getfullcalendar')
    .pipe(map((response) => response));
  }

  Load(id: number) {
    return this.http.get(this.backEndApi + 'appointment/' + id)
    .pipe(map((response: Appointment) => response));
  }

  Create(appointment: Appointment) {

    const params = {
      datetime:     appointment.datetime,
      duration:     appointment.duration,
      patientid:    appointment.patient != null ? appointment.patient.nhc : '',
      visitmodeid:  appointment.visitMode.id,
      visittypeid:  appointment.visitType.id,
      allowinvoice: appointment.allowInvoice,
      forced:       appointment.forced,
      hash:         appointment.hash,
      id:           appointment.id,
      note:         appointment.note,
      ownerid:      appointment.owner.id,
      price:        appointment.price,
      status:       appointment.status
    };

    return this.http.post(this.backEndApi + 'appointment/create', params )
    .pipe(map((response: any) => response));
  }

  Save(appointment: Appointment) {

    console.log(appointment);

    const params = {
      datetime:     appointment.datetime,
      duration:     appointment.duration,
      patientid:    appointment.patient != null ? appointment.patient.nhc : '',
      visitmodeid:  appointment.visitMode.id,
      visittypeid:  appointment.visitType.id,
      allowinvoice: appointment.allowInvoice,
      forced:       appointment.forced,
      hash:         appointment.hash,
      id:           appointment.id,
      note:         appointment.note,
      ownerid:      appointment.owner.id,
      price:        appointment.price,
      status:       appointment.status
    };

    return this.http.post(this.backEndApi + 'appointment/save', params )
    .pipe(map((response: any) => response));
  }
}
