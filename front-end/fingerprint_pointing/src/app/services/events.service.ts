import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from './global.service';

const endpoint: string = GlobalService.backDomain + GlobalService.backApiPath;
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  /**
    * HTTP OPTIONS
    */
   httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'X-CSRFToken': 'TqXf7sEvC3uKNYocBxhSRcI64KprmjzB'
    })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * FUNCTION HANDLER
   */
  private handleError(operation = 'operation', result: any) {
    return (error: any) => {
      console.log(error);
      return of(result as ['']);
    };
  }

  /** Get events */
  allEvents(): Observable<any> {
    return this.http.get(endpoint + '/events/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List matieres', []))
    );
  }

  /** Get events not saved */
  allEventsNotSaved(): Observable<any> {
    return this.http.get(endpoint + '/events/not_saved').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List matieres', []))
    );
  }

  /** Get events not saved */
  allEventsSaved(): Observable<any> {
    return this.http.get(endpoint + '/events/not_saved').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List matieres', []))
    );
  }

  /** Get events Date */
  allEventsDate(date: string): Observable<any> {
    return this.http.get(endpoint + `/events/date/${date}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List matieres', []))
    );
  }

  /** Get events Date */
  allEventsDateTime(date: string, time: string): Observable<any> {
    return this.http.get(endpoint + `/events/date/${date}/time/${time}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List matieres', []))
    );
  }
}
