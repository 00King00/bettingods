import { Injectable } from '@angular/core';

import { AlertController, LoadingController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  loading: any;

  constructor( public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular'
    });
    return await this.loading.present();
  }

  async showError(header: string,  message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass: 'error',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-danger'
        }
      ]
    });
    await alert.present();
  }

  async showSuccess(header: string,  message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-success'
        }
      ]
    });
    await alert.present();
  }
}
