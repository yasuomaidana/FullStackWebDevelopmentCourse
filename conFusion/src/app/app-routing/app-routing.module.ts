import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Import modules for routing
import {RouterModule,Routes} from '@angular/router';
//import routes created
import {routes} from './routes';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
