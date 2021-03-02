import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../../shared/dish'
import { DishService } from '../../services/dish.service';
import { Promotion } from '../../shared/promotion'
import { PromotionService } from '../../services/promotion.service';
import { Leader } from '../../shared/leader'
import { LeaderService } from '../../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dish:Dish;
  dishErr: string;
  leader:Leader;
  leadErr: string;
  promo: Promotion;
  promErr: string;

  constructor( private dishService:DishService,
    private promotionService:PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') private BaseURL ) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().
      subscribe(dish=> this.dish=dish,err=>this.dishErr=err);
    this.promotionService.getFeaturedPromotion().
      subscribe(promo=>this.promo=promo,err=> this.promErr=err);
    this.leaderService.getFeaturedLeader().
      subscribe(leader=>this.leader=leader,err=>this.leadErr=err);
  }

}
