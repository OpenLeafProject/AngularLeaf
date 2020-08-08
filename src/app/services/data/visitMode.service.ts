import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as globals from '../../app.globals';
import { VisitMode } from '../../models/api/visitmode.model';


// import 'rxjs/add/operator/retry'; // don't forget the imports


@Injectable()

export class VisitModeService {

  private G = globals;
  private backEndApi;

  constructor(private http: HttpClient) {

    this.backEndApi = this.G.backEndApi;
  }

  GetAllModes() {
    return this.http.get(this.backEndApi + 'visitmode/getall')
    .pipe(map((response: VisitMode[]) => response));
  }

}
