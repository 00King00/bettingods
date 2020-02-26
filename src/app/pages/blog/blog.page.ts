import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;


import { StoreService } from '../../services/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

  blog = {
    id: null,
    thumbnail: '',
    title: '',
    content: '',
    url: ''
  };
  title: any;
  content: any;

  constructor(
    public sanitizer: DomSanitizer,
    public store: StoreService,
    private alert: AlertService,
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   this.route.params.subscribe( (params: Params) => { this.loadData(params.id) } );

  }

  loadData(blogId) {
    this.alert.showLoading();
    this.api.getBlog(blogId).subscribe(
      (res: any) => {
        this.blog = res.post;
        this.title = this.sanitizer.bypassSecurityTrustHtml(res.post.title);
        this.content = this.sanitizer.bypassSecurityTrustHtml(res.post.content);
        this.alert.loading.dismiss();
      },
      (err) => {
        this.alert.loading.dismiss();
        this.alert.showError('Error', err.message );
      }
    );
  }

  // shareViaF() {
  //   this.socialSharing.shareViaFacebook(null, null, this.blog.url).then((res) => {
  //     console.log(res);
  //   }).catch((err) => {
  //     this.alert.showError('Error', err.message || 'Something went wrong...');
  //   });
  // }

  // shareViaTw() {
  //   this.socialSharing.shareViaTwitter(null, null, this.blog.url).then((res) => {
  //     console.log(res);
  //   }).catch((err) => {
  //     this.alert.showError('Error', err.message || 'Something went wrong...');
  //   });
  // }

  // shareViaEm() {
  //   this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then((res) => {
  //     console.log(res);
  //   }).catch((err) => {
  //     this.alert.showError('Error', err.message || 'Something went wrong...');
  //   });
  // }

  async shareViaAll() {
    await Share.share({
      title: this.blog.title,
      text: 'Really awesome thing you need to see right meow',
      url: this.blog.url,
      dialogTitle: 'Share with buddies'
    }).catch((err) => {
        this.alert.showError('Error', err.message || 'Something went wrong...');
      });
    // this.socialSharing.share(null, this.blog.title, null, this.blog.url).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   this.alert.showError('Error', err.message || 'Something went wrong...');
    // });
  }


}
