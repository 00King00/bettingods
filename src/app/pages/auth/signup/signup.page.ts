import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../../services/alert.service';
import { AuthService, Register } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  data = {
    login: '',
    email: '',
    api_call: true,
    device_token: ''
  };

  emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  constructor( public alert: AlertService, public auth: AuthService ) { }

  onSubmit(form: NgForm) {
    if ( !this.data.email.match(this.emailCheck) || form.invalid ) {
      this.alert.showError('Response Failed', 'Please indicate correct email.');
      return;
    }

    const formData: any = new FormData();

    for (const key in this.data) {
      if (this.data[key]) { formData.append(key, this.data[key]); }
    }
    this.alert.showLoading();
    this.auth.register(formData).subscribe(
      data => {
        this.alert.loading.dismiss();
        this.alert.showSuccess('Success', 'Your registration request has been sent. The response will be sent to your mail.');
      },
      err => {
        let errText = '';
        if (err && err.error && err.error.error && err.error.error.errors) {
          errText = Object.keys(err.error.error.errors).map((elem, i) => {
            return err.error.error.errors[elem];
          })[0];
        } else {
          errText = 'Request has not been sent.';
        }
        this.alert.loading.dismiss();
        this.alert.showError('Error', errText);
      }
    );
  }

  ngOnInit() {
    this.data = {
      login: '',
      email: '',
      api_call: true,
      device_token: localStorage.getItem('token')
    };
    console.log(this.data);
  }

}
