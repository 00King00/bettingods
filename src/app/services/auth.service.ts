import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Register {
  login: string;
  email: string;
}

export interface Login {
  username:	string;
  password:	string;
  remeber:	boolean;
  device_token:	string;
  device_platform:string;
  api_call: boolean;
}

export interface Logout {
  device_token:	string;
  device_platform: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public deviceToken = localStorage.getItem('deviceToken') || '';
  public token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  register(formData: any) {
    return this.http.post('https://members.bettinggods.com/api/registration', formData);
  }

  login(formData: any) {
    return this.http.post('https://members.bettinggods.com/api/login/', formData).pipe(
      tap( (res: any) => {
        if (res.hasOwnProperty('cookie')) {
          localStorage.setItem('token', res.cookie);
          this.token = res.cookie;
        }

        if (res.hasOwnProperty('user')) { localStorage.setItem('user', JSON.stringify(res.user)); }

    }));
  }

  logout(formData: any) {
    return this.http.post('https://members.bettinggods.com/api/logout/', formData).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('blogsGlobal');
        this.token = '';
      })
    );
  }

  changePassword(formData) {
    return this.http.post('https://members.bettinggods.com/api/change_password', formData).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.cookie);
      }),
      catchError((err) => {
        let errText = '';
        if (err && err.error && err.error.error && err.error.error.errors) {
          errText = Object.keys(err.error.error.errors).map((elem, i) => {
            return err.error.error.errors[elem];
          })[0];
          return throwError(errText);
        } else {
          errText = 'Changing password failed';
          return throwError(errText);
        }
      })
    );
  }

  forgotPassword(formData) {
    return this.http.post('https://members.bettinggods.com/api/lost_password', formData).pipe(
      tap( () => {

      })
    );
  }
}
