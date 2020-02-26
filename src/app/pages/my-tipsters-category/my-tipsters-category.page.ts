import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-my-tipsters',
  templateUrl: './my-tipsters-category.page.html',
  styleUrls: ['./my-tipsters-category.page.scss'],
})
export class MyTipstersCategoryPage implements OnInit {
  show = true;
  page = 1;
  lastPage = 2;
  tips: any[] = [];

  constructor(
    private alert: AlertService,
    private api: ApiService,
    private store: StoreService, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.getTips();

  }

  getTips() {
    this.router.isActive('/home/my-tipsters-category', true) ? this.alert.showLoading() : null;
    const header = {
      cookie: localStorage.getItem('token'),
      api_call: true
    };

    this.api.getTipstersCategories(header).subscribe(
      (res: any) => {
        res.categories.forEach((tip, i) => {
          this.store.tipsters[i] = {
            id: tip.id,
            thumbnail: tip.image,
            title: tip.title,
            description: tip.description
          };
        });
        this.tips = this.store.tipsters.slice();

        localStorage.setItem('tipsters', JSON.stringify(this.store.tipsters));

        this.lastPage = res.pages;

        this.alert.loading ? this.alert.loading.dismiss() : null;
      },
      (err: any) => {
        this.alert.loading ? this.alert.loading.dismiss() : null;
        const message = err.error && err.error.error && err.error.error || 'Please check your internet connection or login again';
        this.alert.showError('Error', message);

        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/auth/login');
        }
      }
    );
  }


}
