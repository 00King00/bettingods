import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage, children:[
          // tslint:disable-next-line: max-line-length
          { path: 'my-tipsters-category', loadChildren: () => import('../my-tipsters-category/my-tipsters-category.module').then( m => m.MyTipstersCategoryPageModule) },
          { path: 'buy-tipsters', loadChildren: () => import('../buy-tipsters/buy-tipsters.module').then( m => m.BuyTipstersPageModule) },
          { path: 'blogs', loadChildren: () => import('../blogs/blogs.module').then( m => m.BlogsPageModule) },
          { path: 'blog', loadChildren: () => import('../blog/blog.module').then( m => m.BlogPageModule) },
          { path: '', pathMatch: 'full', redirectTo: '/home/blogs' }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
