import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {
  //also exports dishes that is an array of Dish class
  //we also defined the array
  dishes: Dish[];
  selectedDish: Dish;
  //Create an object dishService of class DishService
  constructor(private dishService:DishService) { }
  //
  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes)=> this.dishes=dishes);
  }

  onSelected(dish:Dish)
  {
    this.selectedDish=dish;
  }

}
