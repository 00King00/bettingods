import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  loading: any;
  settingsData = {
    blogNotif: false,
    tipNotif: false
  };
  constructor(private api: ApiService, private auth: AuthService, private alert: AlertService) { }

  ngOnInit() {
    const settingsData = JSON.parse(localStorage.getItem('settingsData'));
    this.settingsData = {
      blogNotif: settingsData ? Boolean(settingsData.blogNotif) : true,
      tipNotif: settingsData ? Boolean(settingsData.tipNotif) : true
    };
    localStorage.setItem('settingsData', JSON.stringify(this.settingsData));
  }
  async showLoading() {
    this.loading = await this.alert.showLoading();
    this.loading.present();
  }
  setSetting(type: string) {
    this.showLoading();
    const data = {
      status: this.settingsData[type] ? 1 : 0,
      api_call: true,
      device_token: this.auth.deviceToken,
      token: ''
    };

    const formData: any = new FormData();
    for (const key in data) {
      if (data[key]) { formData.append(key, data[key]); }
    }

    if (type === 'blogNotif') {
      this.api.toggleBlogNotif(formData).subscribe(
        () => {
          this.loading.dismiss();
          this.alert.showSuccess('Success', 'Your push notifications settings for blogs have been changed.');
          localStorage.setItem('settingsData', JSON.stringify(this.settingsData));
        },
        err => {
          this.settingsData[type] = !this.settingsData[type];
          this.loading.dismiss();
          this.alert.showError('Error', 'Request has not been sent.' + JSON.stringify(err));
        }
      );
      return;
    }

    if (type === 'tipNotif') {
      this.api.toggleTipNotif(formData).subscribe(
        () => {
          this.loading.dismiss();
          this.alert.showSuccess('Success', 'Your push notifications settings for tipsters have been changed.');
          localStorage.setItem('settingsData', JSON.stringify(this.settingsData));
        },
        err => {
          this.settingsData[type] = !this.settingsData[type];
          this.loading.dismiss();
          this.alert.showError('Error', 'Request has not been sent.' + JSON.stringify(err));
        }
      );
    }

  }

}
