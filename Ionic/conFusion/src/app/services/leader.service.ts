import { Injectable } from '@angular/core';

//Import classes and info 
import { Leader} from '../shared/leader';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHttpmsgService } from './process-httpmsg.service';

//Import http client
import { HttpClient } from '@angular/common/http';
//import base url
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPmsgService:ProcessHttpmsgService) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL+"leaders").
    pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL +"leaders/"+id).
    pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL+"leaders?featured=true")
    .pipe(map(Leaders => Leaders[0])).
    pipe(catchError(this.processHTTPmsgService.handleError));
    //of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
