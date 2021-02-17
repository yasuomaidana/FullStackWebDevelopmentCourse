import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService} from './process-httpmsg.service';

//Import http client
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import base url
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class FeedbackserviceService {

  constructor(private http:HttpClient,
    private processHTTPmsgService:ProcessHTTPMsgService) { }
  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(baseURL+'feedback').pipe(catchError(this.processHTTPmsgService.handleError))
  }
  writeFeedback(feedback:Feedback):Observable<Feedback>
  {
    const httpOptions ={ 
      headers: new HttpHeaders({
      'Content-Type':'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL+'feedback',feedback,httpOptions).
    pipe(catchError(this.processHTTPmsgService.handleError))
  }
}
