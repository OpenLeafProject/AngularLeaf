import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public toasterService: ToastrService,
        private router: Router,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    switch (evt.status) {
                        case 201:
                            this.toasterService.success(
                                evt.status + ' ' + evt.statusText,
                                'Canvis desats correctament',
                                { positionClass: 'toast-top-right' }
                            );
                            break;
                        case 202:
                            this.toasterService.success(
                                evt.status + ' ' + evt.statusText,
                                'Canvis desats correctament',
                                { positionClass: 'toast-top-right' }
                            );
                            break;
                    }
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {

                        switch (err.status) {
                            case 304:
                                this.toasterService.error(
                                    err.status + ' ' + err.statusText,
                                    // err.statusText +
                                    ' Error actualitzant el registre.',
                                    { positionClass: 'toast-top-right' }
                                );
                                break;
                            case 401:
                                this.toasterService.error(
                                    err.status + ' ' + err.statusText,
                                    'Su sesión ha caducado.',
                                    { positionClass: 'toast-top-right' }
                                );
                                sessionStorage.clear();
                                // tslint:disable-next-line:only-arrow-functions
                                setTimeout(function() {
                                    window.location.href = '';
                                }, 5000);
                                break;
                            case 403:
                                this.toasterService.error(
                                    err.status + ' ' + err.statusText,
                                    ' Acceso prohibido.',
                                    { positionClass: 'toast-top-right' }
                                );
                                break;
                            case 404:
                                this.toasterService.error(
                                    err.status + ' ' + err.statusText,
                                    ' Recurso no encontrado.',
                                    { positionClass: 'toast-top-right' }
                                );
                                break;
                            case 418:
                                // nothing to do
                                break;
                            case 500:
                                this.toasterService.error(
                                    err.status + ' ' + err.statusText,
                                    ' Error interno del servidor.',
                                    { positionClass: 'toast-top-right' }
                                );
                                break;
                            case 0:
                                this.toasterService.error(
                                    'El servidor no esta disponible.', // err.status + ' ' + err.statusText,
                                    ' No se puede establecer conexión.',
                                    { positionClass: 'toast-top-right' }
                                );
                                break;

                            default:
                                this.toasterService.error(
                                    err.status + '',
                                    err.statusText,
                                    { positionClass: 'toast-top-right' }
                                );
                                break;
                        }

                    } catch (e) {
                        this.toasterService.error('An error occurred', '', { positionClass: 'toast-top-right' });
                    }
                }
                return of(err);
            }));

    }

}
