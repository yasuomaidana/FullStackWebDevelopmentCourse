import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
//Imports services
import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { FavoriteService } from "./services/favorite.service";
import { baseURL } from './shared/baseurl';

import { ReservationPageModule } from "./pages/reservation/reservation.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, ReservationPageModule,FormsModule,ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DishService, LeaderService,
    PromotionService, ProcessHttpmsgService, FavoriteService,
    { provide:'BaseURL', useValue:baseURL}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
