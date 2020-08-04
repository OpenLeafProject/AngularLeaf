import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as globals from '../../app.globals';
import { Patient } from 'src/app/models/api/patient.model';
import { Note } from 'src/app/models/api/note.model';


// import 'rxjs/add/operator/retry'; // don't forget the imports


@Injectable()

export class PatientService {

  private G = globals;
  private backEndApi;

  constructor(private http: HttpClient) {

    this.backEndApi = this.G.backEndApi;
  }

  Load(nhc :number | string) {
    return this.http.get(this.backEndApi + 'patient/' + nhc)
    .pipe(map((response: Patient) => response));
  }

  GetNotes(nhc :number) {
    return this.http.get(this.backEndApi + 'patient/' + nhc + '/notes')
    .pipe(map((response: Note[]) => response));
  }

  CreateNote(content: string, nhc :number ) {
    const params = {
      content
    };
    return this.http.post(this.backEndApi + 'patient/' + nhc + '/notes/create', params)
    .pipe(map((response: Patient[]) => response));
  }

  Search(value: string) {
    return this.http.get(this.backEndApi + 'patient/search/' + value)
    .pipe(map((response: Patient[]) => response));
  }

  Create(value: Patient){

    /*
    const params = {
      completadas: statusFilter.completadas,
      programadas: statusFilter.programadas,
      informadas: statusFilter.informadas,
      mytasks: myTasksv,
      fromDate: fromDate.format('DD-MM-YYYY'),
      toDate: toDate.format('DD-MM-YYYY')
    };*/

    return this.http.post(this.backEndApi + 'patient/create', value)
    .pipe(map((response: Patient) => response));
  }
}
