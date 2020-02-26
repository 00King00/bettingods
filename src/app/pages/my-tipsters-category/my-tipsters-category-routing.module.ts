import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTipstersCategoryPage } from './my-tipsters-category.page';
import { MyTipstersPage } from './my-tipsters/my-tipsters.page';

const routes: Routes = [
  {
    path: '',
    component: MyTipstersCategoryPage,
    children: [
      {path: ':id', component: MyTipstersPage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTipstersCategoryPageRoutingModule {}
