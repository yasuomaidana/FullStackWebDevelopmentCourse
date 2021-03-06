import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishdetailPage } from './dishdetail.page';

const routes: Routes = [
  {
    path: '',
    component: DishdetailPage
  },
  /*{
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishdetailPageRoutingModule {}
