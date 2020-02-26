import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTipstersCategoryPageRoutingModule } from './my-tipsters-category-routing.module';

import { MyTipstersCategoryPage } from './my-tipsters-category.page';
import { MyTipstersPage } from './my-tipsters/my-tipsters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTipstersCategoryPageRoutingModule
  ],
  declarations: [MyTipstersCategoryPage, MyTipstersPage]
})
export class MyTipstersCategoryPageModule {}
