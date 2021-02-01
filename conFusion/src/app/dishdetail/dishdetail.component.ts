// We use Input when we pass information through methods that 
//are not links
//import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit} from '@angular/core';
//To use information using url parameters
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish'
//Import services
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit 
{ 
    //Since we are not passing the information through
    //@Input()
    dish: Dish;
    constructor(private dishService:DishService,
      private location:Location,
      private route:ActivatedRoute) { }

    ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.dishService.getDish(id).then((dish)=>this.dish=dish);
    }
    goBack(): void{
      this.location.back();
    }
}
