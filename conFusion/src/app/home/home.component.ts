import { Component, OnInit, Inject } from '@angular/core';
//Import classes and services
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader} from '../shared/leader'
import { LeaderService } from '../services/leader.service';
import {flyInOut, expand} from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[flyInOut(),expand()]
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  dishErrmss:string;
  constructor(private dishService:DishService,
    private promotionService:PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().
    subscribe((dish)=> this.dish=dish,errMsg=>this.dishErrmss=errMsg);
    this.promotionService.getFeaturedPromotion().subscribe((promo)=>this.promotion=promo);
    this.leaderService.getFeaturedLeader().subscribe((leader)=>this.leader=leader);
  }

}
