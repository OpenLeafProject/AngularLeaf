import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
    providedIn: 'root',
})

export class AuthUserService {

  private user;
  private token;
  private profile;

  constructor() {}

  public getKeyName(key: string) {
    const keyName: string = key + '_' + this.user;
    const md5: Md5 = new Md5();
    const hashed: string = md5.appendAsciiStr(keyName).end().toString();
    return hashed;
  }

  public getMd5Value(value: string) {
    return this.getKeyName(value);
  }

  getToken() {
    if (this.token == null) {
        this.user = sessionStorage.getItem('user');
        this.token = sessionStorage.getItem(this.getKeyName('token'));
    }
    return this.token;
  }

  getProfile() {
    if (this.profile == null) {
       this.user = sessionStorage.getItem('user');
       this.profile = sessionStorage.getItem(this.getKeyName('profile'));
    }
    return this.profile;
  }

  getUser() {
    if (this.user == null) {
        this.user = sessionStorage.getItem('user');
     }
    return this.user;
  }

  getHeaderObject() {
    if (this.token == null) {
      this.user = sessionStorage.getItem('user');
      this.token = sessionStorage.getItem(this.getKeyName('token'));
    }
    return {token: this.token};
  }

  setUser(value: string) {
    this.user = value;
    sessionStorage.setItem('user', value);
  }

  setToken(value: string) {
    this.token = value;
    sessionStorage.setItem(this.getKeyName('token'), value);
  }

  setProfile(value: string) {
    sessionStorage.setItem(this.getKeyName('profile'), this.getKeyName(value));
  }

}
