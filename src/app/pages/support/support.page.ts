import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  loading: any;
  data = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(private api: ApiService, private alert: AlertService) { }

  ngOnInit() {
  }
  onSubmit(form) {
    if (form.invalid) {this.alert.showError('Error', 'Form is not valid, please check and try again'); return; }
    this.showLoading();

    const formData: any = new FormData();
    for (const key in this.data) {
      if (this.data[key]) { formData.append(key, this.data[key]); }
    }
    this.api.sendSupport(formData).subscribe(
      () => {
        this.loading.dismiss();
        this.alert.showSuccess('Success', 'Thanks for your message, we\'ll get back to you within 24hrs.');
      },
      () => {
        this.loading.dismiss();
        this.alert.showError('Error', 'Request has not been sent.');
      }
    );

  }
  async showLoading() {
    this.loading = await this.alert.showLoading();
    this.loading.present();
  }

}
