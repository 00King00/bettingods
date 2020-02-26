import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   data = {
    username: 'tasyk1991@gmail.com',
    password: 'adwise180791',
    remember: false,
    api_call: true,
    showPass: false,
    type: 'password',
    device_token: '',
    device_platform: ''
  };


  constructor(private auth: AuthService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    if (this.auth.deviceToken) {
      this.data.device_token = this.auth.deviceToken;
    }
  }

  changeType() { this.data.type = this.data.showPass ? 'password' : 'text'; }

  onSubmit(form) {
    if (form.invalid) {
      this.alert.showError('Error', 'Name and password are required!');
    } else {
      this.alert.showLoading();
      const formData: any = new FormData();

      for (const key in this.data) {
        if (this.data[key]) { formData.append(key, this.data[key]); }
      }

      this.auth.login(formData).subscribe(
        () => {
        this.alert.loading.dismiss();
        this.router.navigate(['/']);

        },
        err => {
          const text = err.error && err.error.error && err.error.error || 'Please check your credentials and network connection.';
          this.alert.loading.dismiss();
          this.alert.showError('Login Failed', text);
        }
      );

    }
  }

}
