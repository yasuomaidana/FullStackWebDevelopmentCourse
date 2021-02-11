import { Injectable } from '@angular/core';
import { Promotion} from '../shared/promotion';


import { Observable, of } from 'rxjs';
import { delay , map} from 'rxjs/operators';

//Import http client
import { HttpClient } from '@angular/common/http';
//import base url
import { baseURL } from '../shared/baseurl';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }
  
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL+"promotions");
    //of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL+"promotions/"+"id");
    //of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL+"promotions?featured=true").pipe(map(promotions=>promotions[0]));
    //of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
}
