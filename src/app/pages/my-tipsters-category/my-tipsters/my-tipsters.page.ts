import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-my-tipsters',
  templateUrl: './my-tipsters.page.html',
  styleUrls: ['./my-tipsters.page.scss'],
})
export class MyTipstersPage implements OnInit {
  page = 1;
  lastPage = 2;
  tips: any[] = [];
  routeId: number | null;

  constructor(private alert: AlertService, private api: ApiService, private store: StoreService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.routeId = +params['id'];
      console.log(this.routeId);
    });
    this.getTipsters();
  }
  getTipsters() {
    const header = {
      cookie: localStorage.getItem('token'),
      api_call: true
    };
    this.api.getTipsters(this.routeId, this.page, header).subscribe(
      (res: any) => {
        this.tips = [...res.posts];
        console.log(this.tips);
        
      },
      (err: any) => {
        const message = err.error && err.error.error && err.error.error || 'Please check your internet connection or login again';
        this.alert.showError('Error', message);
      }
    );
  }




}
