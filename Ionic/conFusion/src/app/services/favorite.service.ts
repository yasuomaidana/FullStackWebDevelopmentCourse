import { Injectable } from '@angular/core';

import { Observable,throwError } from "rxjs";
import { map } from "rxjs/operators";
import { DishService } from "./dish.service";
import { Dish } from "../shared/dish";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites:Array<any>;

  constructor(
    private dishService:DishService, private stg:Storage
  ) {
    this.stg.get("favorites").then(favorites=>{
      if (favorites){
        this.favorites=favorites;
      }
      else{this.favorites=[];}
    });
   }
  addFavorite(id:number):boolean{
    if (!this.isFavorite(id)){
      this.favorites.push(id);
      this.stg.set("favorites",this.favorites);
    }
    
    return true;
  }
  isFavorite(id:number):boolean{
    return this.favorites.some(el => el===id);
  }
  getFavorites(): Observable<Dish[]>{
    return this.dishService.getDishes().pipe(
    map(dishes => dishes.filter( dish => this.isFavorite(dish.id))));
  }
  deleteFavorite(id:number):Observable<Dish[]>{
    let index = this.favorites.indexOf(id);
    if(index>=0){ 
      this.favorites.splice(index,1);
      this.stg.set("favorites",this.favorites);
      return this.getFavorites();
    }
    else{ return Observable.throw("Deleting non existant id") }
  }
}
