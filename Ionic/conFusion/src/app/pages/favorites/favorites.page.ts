import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../../shared/dish';
import { FavoriteService } from '../../services/favorite.service';
import { IonItemSliding } from '@ionic/angular';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites:Dish[];
  errMes:string;
  constructor(private favoriteService:FavoriteService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites().
    subscribe(favorites=>this.favorites=favorites,err=>this.errMes=err);

  }
  deleteFavorite(item:IonItemSliding,id:number){
    this.favoriteService.deleteFavorite(id).
    subscribe(dishes=>this.favorites=dishes,err=>this.errMes=err);
    item.close();
  }
}
