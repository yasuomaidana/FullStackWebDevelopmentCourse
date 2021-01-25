import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//Element added
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import 'hammerjs';
//Import components
import { MenuComponent } from './menu/menu.component';
import {MatListModule} from '@angular/material/list';
import { DishdetailComponent } from './dishdetail/dishdetail.component'; 
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

//Import services
import {DishService} from './services/dish.service';

//Import module
import {AppRoutingModule} from './app-routing/app-routing.module'

@NgModule({
  //Import the components created
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  //Imports again the elements and modules imported, but now they are included in NgModule(s)
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule
  ],
  //Import the services created
  providers: [
    DishService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
