import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth/authUser.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authUser: AuthUserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Try to get token
    try {
      const authData = this.authUser.getHeaderObject();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        // tslint:disable-next-line:object-literal-key-quotes
        'token': authData.token,
        // tslint:disable-next-line:object-literal-key-quotes
      });

      // Return original request if token doesn't exists
      if (authData.token == null) {
        return next.handle(req);
      }

      // const authReq = req.clone({ headers: req.headers.set('Authorization', token) });
      const authReq = req.clone({headers});

      // Return modified request with auth params in header
      return next.handle(authReq);

    } catch (ex) {
      // Return original request if error
      return next.handle(req);
    }

  }
}
