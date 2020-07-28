import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import * as globals from '../../app.globals';
import { AuthHttpHeaders } from '../../models/common/AuthHttpHeaders.model';

@Injectable()

export class LoginService {

  private G = globals;
  private backEndApi;
  private keyName;
  private md5;
  private token;

  constructor(private http: HttpClient) {
    this.backEndApi = this.G.backEndApi;
    this.keyName = 'token_' + sessionStorage.getItem('user');
    this.md5 = new Md5();
    const hashed = this.md5.appendAsciiStr(this.keyName).end();
    this.token = sessionStorage.getItem(hashed);
  }

  login(user, password) {
    let reqheaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      user,
      password
      });

    return this.http.get(this.backEndApi + 'security/login', {headers: reqheaders}).pipe(map((response: any) => response));
  }

  getLoginProfile(token) {

    const authHeader = new AuthHttpHeaders({token});
    const headers = {headers: new HttpHeaders(authHeader.headers)};

    return this.http.get(this.backEndApi + 'security/GetProfile', headers ).pipe(map((response: any) => response));
  }

  checkToken() {

    const authHeader = new AuthHttpHeaders({token: this.token});
    const headers = {headers: new HttpHeaders(authHeader.headers)};

    return this.http.post(this.backEndApi + 'security/CheckToken', {}, headers ).pipe(map((response: any) => response));
  }

}
