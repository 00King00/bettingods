import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  private loading: any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Be Responsible',
      url: '/responsible',
      icon: 'list'
    },
    {
      title: 'Support',
      url: '/support',
      icon: 'paper-plane'
    },
    {
      title: 'Invite Friends',
      url: '/invite',
      icon: 'body'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    // {
    //   title: 'Logout',
    //   url: '/',
    //   icon: 'log-out'
    // },
    {
      title: 'Login',
      url: '/auth/login',
      icon: 'log-in'
    },
    {
      title: 'Sign up',
      url: '/auth/signup',
      icon: 'jet'
    },
  ];
  constructor(
    public alert: AlertService,
    public auth: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  onLogout() {
    this.showLoading();
    const data = {
      data: localStorage.getItem('token'),
      device_token: this.auth.deviceToken,
      api_call: true
    };
    const formData = new FormData();

    for (const key in data) {
      if ( data[key]) { formData.append(key, data[key]); }
    }

    this.auth.logout(formData).subscribe( () => {
        this.loading.dismiss();
        this.router.navigateByUrl('/');
      },
      err => {
        this.loading.dismiss();
        const text = err.error && err.error.error && err.error.error || 'Something went wrong please try again.';
        this.alert.showError('Logout Failed', text);
      }

    );
  }
  async showLoading() {
    this.loading = await this.alert.showLoading();
    this.loading.present();
  }
}
