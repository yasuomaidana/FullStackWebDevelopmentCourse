import { Injectable } from '@angular/core';
//Import classes and info 
import { Leader} from '../shared/leader';

import { Observable, of } from 'rxjs';
import { delay , map } from 'rxjs/operators';

//Import http client
import { HttpClient } from '@angular/common/http';
//import base url
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL+"leadership");
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL +"leadership/"+id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL+"leadership?featured=true").pipe(map(Leaders => Leaders[0]));
    //of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
