import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  data = {
    showPass: false,
    type: 'password',
    password: '',
    confirm: '',
    api_call: true,
    token: localStorage.getItem('token')
  };
  get showPass() { return this.data.showPass ? 'text' : 'password'; }
  constructor(private auth: AuthService, private alert: AlertService) { }

  ngOnInit() {}
  onSubmit() {
    if (!this.data.token) {
      this.alert.showError('Error', 'Please login before changin password.');
      return;
    }

    this.alert.showLoading();
    const formData: any = new FormData();
    for (const key in this.data) {
      if (this.data[key]) { formData.append(key, this.data[key]); }
    }

    this.auth.changePassword(formData).subscribe(
      (res: any) => {
        this.alert.loading.dismiss();
        this.alert.showSuccess('Success', 'Your password has been changed.');
      },
      (errText: any) => {
        this.alert.loading.dismiss();
        this.alert.showError('Error', errText);
      }
    );
  }

}
