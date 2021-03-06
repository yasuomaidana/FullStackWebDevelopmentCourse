import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DishdetailPageRoutingModule } from './dishdetail-routing.module';

import { DishdetailPage } from './dishdetail.page';
import { CommentPageModule } from './comment/comment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishdetailPageRoutingModule,CommentPageModule
  ],
  declarations: [DishdetailPage]
})
export class DishdetailPageModule {}
