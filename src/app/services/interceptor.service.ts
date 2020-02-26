import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');

    const cloneReq = req.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        // 'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
        // 'X-Requested-With': 'XMLHttpRequest',
      })
    //     headers: req.headers.set('Access-Control-Allow-Origin', "http://192.168.1.12:8100")
    //     .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    });
    console.log('Intercepted HTTP call', cloneReq);

    return next.handle(cloneReq);
  }
}
export const HttpInterceptorService = { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true };
