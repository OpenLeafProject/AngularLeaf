import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as globals from '../../app.globals';
import { VisitType } from '../../models/api/visittype.model';


// import 'rxjs/add/operator/retry'; // don't forget the imports


@Injectable()

export class VisitTypeService {

  private G = globals;
  private backEndApi;

  constructor(private http: HttpClient) {

    this.backEndApi = this.G.backEndApi;
  }

  GetAllTypes() {
    return this.http.get(this.backEndApi + 'visittype/getall')
    .pipe(map((response: VisitType[]) => response));
  }

}
