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
//Modals pages
import { LoginPageModule } from './pages/login/login.module';
import { ReservationPageModule } from "./pages/reservation/reservation.module";
//Forms stuffs
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Storage stuffs
import { IonicStorageModule } from '@ionic/storage';

//Notification stuffs
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//Social media
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, 
    //modal pages
    ReservationPageModule,LoginPageModule,
    //forms stuffss
    FormsModule,ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DishService, LeaderService,
    PromotionService, ProcessHttpmsgService, FavoriteService,
    LocalNotifications,EmailComposer, SocialSharing,
    { provide:'BaseURL', useValue:baseURL}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
