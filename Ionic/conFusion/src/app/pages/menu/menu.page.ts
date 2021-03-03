import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Routes,Router, NavigationExtras } from '@angular/router';
import { DishdetailPage } from "./dishdetail/dishdetail.page"

import { Dish } from "../../shared/dish";
import { DishService } from "../../services/dish.service"
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  //rootPage= DishdetailPage;
  dishes: Dish[];
  dishErr:string;
  @ViewChild('myNav') nav: NavController
  constructor( private dishService:DishService,
    @Inject("BaseURL") private BaseURL,
    private router:Router) { }

  ngOnInit() {
    this.dishService.getDishes().subscribe(dishes => this.dishes=dishes,err=>this.dishErr=err);
  }
  dishSelected(dish){
    ///// This method send the info through url
    /*To send only strings
    //let navigationExtras:NavigationExtras={queryParams:{dish:"asjdkaslda"}}
    
    //To send object you can use json format
    //let navigationExtras:NavigationExtras={queryParams:{dish:JSON.stringify(dish)}}
    */

    //This method send the info using state
    let navigationExtras:NavigationExtras={
      state:{dish:dish}
    }
    this.router.navigate(['/menu/dishdetail'],navigationExtras)
    //this.navCtrl.navigateForward("dishdetail",dish)
  }
}
