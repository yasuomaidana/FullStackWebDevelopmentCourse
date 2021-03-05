import { Injectable } from '@angular/core';

import { Observable,throwError } from "rxjs";
import { map } from "rxjs/operators";
import { DishService } from "./dish.service";
import { Dish } from "../shared/dish";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites:Array<any>;

  constructor(
    private dishService:DishService
  ) {
    this.favorites=[];
   }
  addFavorite(id:number):boolean{
    if (!this.isFavorite(id)){
      this.favorites.push(id);}
    
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
      this.favorites.splice(id,1);
      return this.getFavorites();
    }
    else{ return Observable.throw("Deleting non existant id") }
  }
}
