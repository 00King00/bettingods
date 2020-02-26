import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyTipstersPage } from './buy-tipsters.page';

const routes: Routes = [
  {
    path: '',
    component: BuyTipstersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyTipstersPageRoutingModule {}
