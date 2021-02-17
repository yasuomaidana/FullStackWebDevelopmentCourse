import { Injectable } from '@angular/core';
import { Promotion} from '../shared/promotion';


import { Observable } from 'rxjs';
import { map,catchError} from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
//Import http client
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import base url
import { baseURL } from '../shared/baseurl';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }
  
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL+"promotions").
    pipe(catchError(this.processHTTPMsgService.handleError));
    //of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL+"promotions/"+"id").
    pipe(catchError(this.processHTTPMsgService.handleError));
    //of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL+"promotions?featured=true")
    .pipe(map(promotions=>promotions[0])).
    pipe(catchError(this.processHTTPMsgService.handleError));
    //of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
}
