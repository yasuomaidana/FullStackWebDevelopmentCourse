import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites:Array<any>;
  constructor() {
    this.favorites=[];
   }
  addFavorite(id:number):boolean{
    this.favorites.push(id);
    return true;
  }
  isFavorite(id:number):boolean{
    return this.favorites.some(el => el===id);
  }
}
