import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as globals from '../../app.globals';
import { User } from 'src/app/models/api/user.model';


// import 'rxjs/add/operator/retry'; // don't forget the imports


@Injectable()

export class UserService {

  private G = globals;
  private backEndApi;

  constructor(private http: HttpClient) {

    this.backEndApi = this.G.backEndApi;
  }

  GetAllUsers() {
    return this.http.get(this.backEndApi + 'user/getall')
    .pipe(map((response: User[]) => response));
  }

}
