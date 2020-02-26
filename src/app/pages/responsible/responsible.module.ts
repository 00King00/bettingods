import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsiblePageRoutingModule } from './responsible-routing.module';

import { ResponsiblePage } from './responsible.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsiblePageRoutingModule
  ],
  declarations: [ResponsiblePage]
})
export class ResponsiblePageModule {}
