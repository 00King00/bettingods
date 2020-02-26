import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { StoreResponsibleService } from './store-responsible.service';


@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.page.html',
  styleUrls: ['./responsible.page.scss'],
})
export class ResponsiblePage implements OnInit {

  constructor(
    public alert: AlertService,
    public api: ApiService,
    public sanitizer: DomSanitizer,
    public store: StoreResponsibleService
  ) {}

  ngOnInit() {
    if (!this.store.response.loaded) {
      this.alert.showLoading();
      this.api.getResponsible().subscribe(
        (res: any) => {
          this.store.response.title = this.sanitizer.bypassSecurityTrustHtml(res.post.title);
          this.store.response.content = this.sanitizer.bypassSecurityTrustHtml(res.post.content);
          this.store.response.imgUrl = res.post.attachments[0].images.medium.url;
          this.store.response.loaded = true;

          this.alert.loading.dismiss();
        },
        err => {
          this.alert.loading.dismiss();
          this.alert.showError('Error', 'Something went wrong... Please check your internet connection.');
        }
      );
    }
  }

}
