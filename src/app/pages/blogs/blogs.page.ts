import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

import { ApiService } from 'src/app/services/api.service';
import { AlertService } from '../../services/alert.service';
import { StoreService } from '../../services/store.service';
import { Blog } from '../blogs/blog.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.page.html',
  styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage implements OnInit {
  categories: any;
  blogs: Blog[] = [];
  page = 1;
  lastPage = 2;
  currentCategory = 'All';
  currentCatId = '';
  notShown = true;
  catId = '';
  offlineMode = false;
  isInfiniteScroll = false;

  constructor(
    private api: ApiService,
    private alert: AlertService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    public store: StoreService
  ) {}

  async ngOnInit() {
    const blogs = await this.storage.get('blogsGlobal');

    this.api.getCategories().subscribe(
      (res: any) => {
        this.categories = res.categories;
      }
    );

    if (blogs) {
      this.blogs = blogs || [];
    } else {
      this.loadBlogs(this.page, this.catId);
    }
  }

  loadBlogs(page: number, catId: string, event?) {
    // tslint:disable-next-line: no-unused-expression
    page === 1 && this.alert.showLoading();

    this.currentCatId = catId;
    this.api.getBlogs(page, catId).subscribe(
      async (res: any) => {
        this.offlineMode = false;
        try {
          await this.storage.remove('blogsGlobal');
          res.posts.forEach((blog) => {
            // tslint:disable-next-line: max-line-length
            const imgUrl = blog.thumbnail ? blog.thumbnail : blog.attachments.length && blog.attachments[0].images && blog.attachments[0].images.medium ? blog.attachments[0].images.medium.url : '';
            this.store.blogsGlobal.push({
              id: blog.id,
              thumbnail: imgUrl,
              title: blog.title,
              content: blog.content
            });
          });
          await this.storage.set('blogsGlobal', this.store.blogsGlobal);
          this.blogs = this.store.blogsGlobal.slice();
          this.lastPage = res.pages;
          if (event) { event.target.complete(); }
          if (this.alert.loading) { this.alert.loading.dismiss(); }
        } catch (error) {
          this.alert.showError('Error', error.message);
          if (this.alert.loading) { this.alert.loading.dismiss(); }
        }
        function wrapOld(){
        ///////////////////////
        // this.storage.remove('blogsGlobal')
        //   .then( async () => {
        //     res.posts.forEach((blog) => {
        //       // tslint:disable-next-line: max-line-length
        //       const imgUrl = blog.thumbnail ? blog.thumbnail : blog.attachments.length && blog.attachments[0].images && blog.attachments[0].images.medium ? blog.attachments[0].images.medium.url : '';
        //       function wrap() {
        //         // if (this.page < 2 && cntPosts < 8) {
        //         //   this.store.blogsGlobal[i] = {
        //         //     id: blog.id,
        //         //     thumbnail: imgUrl,
        //         //     title: blog.title,
        //         //     content: blog.content
        //         //   };
        //         //   this.blogs[i] = {
        //         //     id: blog.id,
        //         //     thumbnail: imgUrl,
        //         //     title: this.sanitizer.bypassSecurityTrustHtml(blog.title),
        //         //     content: blog.content
        //         //   };
        //         // } else if (this.page > 1 && cntPosts < 8) {
        //         //   this.store.blogsGlobal[(this.page - 1) * 8 + i] = {
        //         //     id: blog.id,
        //         //     thumbnail: imgUrl,
        //         //     title: blog.title,
        //         //     content: blog.content
        //         //   };
        //         //   this.blogs[(this.page - 1) * 8 + i] = {
        //         //     id: blog.id,
        //         //     thumbnail: imgUrl,
        //         //     title: this.sanitizer.bypassSecurityTrustHtml(blog.title),
        //         //     content: blog.content
        //         //   }
        //         // } else {
        //         //   this.store.blogsGlobal[this.page * 8 - i - 1] = {
        //         //     id: blog.id,
        //         //     thumbnail: imgUrl,
        //         //     title: blog.title,
        //         //     content: blog.content
        //         //   };
        //         //   this.blogs[this.page * 8 - i - 1] = {
        //         //     id: blog.id,
        //         //     thumbnail: imgUrl,
        //         //     title: this.sanitizer.bypassSecurityTrustHtml(blog.title),
        //         //     content: blog.content
        //         //   };
        //         // }
        //         // });
        //       }
        //       this.store.blogsGlobal.push({
        //         id: blog.id,
        //         thumbnail: imgUrl,
        //         title: blog.title,
        //         content: blog.content
        //       });
        //     });
        //     try {
        //       await this.storage.set('blogsGlobal', this.store.blogsGlobal);
        //       this.blogs = this.store.blogsGlobal.slice();
        //       this.lastPage = res.pages;
        //     } catch (error) { console.error(error); }
        //     if (event) { event.target.complete(); }
        //    })
        //    .catch( err => { console.error(err); });
        // if (this.loading) { this.loading.dismiss(); }
        }
      },
      async () => {
        this.offlineMode = true;

        try {
          const blogs = await this.storage.get('blogsGlobal');
          if (blogs) {
            this.alert.showSuccess('Offline mode', 'Blogs that were saved during previous session are available.');
            this.store.blogsGlobal = blogs;
            this.blogs = blogs.map(b => {
              b.thumbnail = 'src/assets/imgs/offline_mode.jpg';
              b.title = this.sanitizer.bypassSecurityTrustHtml(b.title);
            });
          }

        } catch (e) {  this.alert.showError('Error', 'Please check your internet connection.');}
        if (this.alert.loading) { this.alert.loading.dismiss(); }
      }
    );

  }

  loadMoreBlogs(event) {
    this.loadBlogs(++this.page, this.currentCatId, event);
    if (this.lastPage <= this.page) {
      this.isInfiniteScroll = true;
    }
  }
  chooseCategory(name, id) {
    this.currentCategory = name;
    this.blogs = [];
    this.page = 1;
    this.notShown = !this.notShown;
    this.store.blogsGlobal = [];
    this.isInfiniteScroll = false;
    this.loadBlogs(this.page, id);
  }

}
