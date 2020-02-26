import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  onFetch = false;
  data = {
    email: '',
    api_call: 'true'
  };

  constructor(private auth: AuthService, private alert: AlertService, private router: Router) { }
  ngOnInit() {}

  onSubmit(form) {
    this.onFetch = true;
    if (form.invalid) {
      this.alert.showError('Response Failed', 'Please indicate correct email.');
      return;
    }
    const formData: any = new FormData();

    for (const key in this.data) {
      if (this.data[key]) { formData.append(key, this.data[key]); }
    }
    this.auth.forgotPassword(formData).subscribe(
      () => {
        this.alert.showSuccess('Done', 'Check your email for the confirmation link.');
        this.router.navigateByUrl('/auth/login');

      },
      (err) => {
        const error = err.error.error || 'Something whent wrong, please try again';
        this.alert.showError('Failed', error);
        this.onFetch = false;
      }
    );
  }

}
