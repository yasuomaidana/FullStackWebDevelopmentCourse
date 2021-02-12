import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { LayoutGapDirective } from '@angular/flex-layout';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {
  //also exports dishes that is an array of Dish class
  //we also defined the array
  dishes: Dish[];
  errMess: string;
  //Create an object dishService of class DishService
  constructor(private dishService:DishService,
    @Inject('BaseURL') private BaseURL) { }
  //
  ngOnInit() {
    this.dishService.getDishes().
    subscribe((dishes)=> this.dishes=dishes,
    errmss => this.errMess=<any>errmss);
  }

  

}
