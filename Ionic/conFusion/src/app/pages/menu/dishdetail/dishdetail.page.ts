import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from "../../../shared/dish";
import { ActivatedRoute, Router } from '@angular/router';

import { FavoriteService } from "../../../services/favorite.service"
//https://www.youtube.com/watch?v=XyLcPdv1LKM
//https://ionicacademy.com/pass-data-angular-router-ionic-4

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {
  dish: Dish;
  errMess:string;
  avgstars:string;
  numcomments:number;
  favorite: boolean =false;

  constructor( @Inject("BaseURL") private BaseURL,
    private route:ActivatedRoute, private router:Router,
    private favoriteService:FavoriteService) {
      this.route.queryParams.subscribe(params =>{
        ////This method pass the infor trhough url
        /*if (params && params.dish){
          //console.log("params",params);
          //To receive only string
          //this.dish=params.dish;

          //To receive object
          this.dish=JSON.parse(params.dish);
          
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating );
          this.avgstars = (total/this.numcomments).toFixed(2);
        }
        */

        //This method use state
        if(this.router.getCurrentNavigation().extras.state){
          this.dish=this.router.getCurrentNavigation().extras.state.dish;
          
          this.favorite=this.favoriteService.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating );
          this.avgstars = (total/this.numcomments).toFixed(2);
        }
      })
    }

  ngOnInit() {

  }
  addToFavorite(){
    console.log("adding to favorites",this.dish.id);
    this.favorite=this.favoriteService.addFavorite(this.dish.id);
  }

}
