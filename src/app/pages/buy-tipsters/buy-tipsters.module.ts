import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyTipstersPageRoutingModule } from './buy-tipsters-routing.module';

import { BuyTipstersPage } from './buy-tipsters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyTipstersPageRoutingModule
  ],
  declarations: [BuyTipstersPage]
})
export class BuyTipstersPageModule {}
