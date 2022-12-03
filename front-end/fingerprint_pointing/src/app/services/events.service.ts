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
      catchError(this.handleError('List events', []))
    );
  }

  /** Get events Date */
  allEventsDate(debut: string, fin: string): Observable<any> {
    return this.http.get(endpoint + `/events/debut/${debut}/fin/${fin}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List events', []))
    );
  }

  /** Get events N P */
  allEventsNP(id_niveau: string, id_parcours: string): Observable<any> {
    return this.http.get(endpoint + `/events/niveaux/${id_niveau}/parcours/${id_parcours}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List events', []))
    );
  }

  /** Get events Date NP */
  allEventsNPDate(id_niveau: string, id_parcours: string, debut: string, fin: string): Observable<any> {
    return this.http.get(endpoint + `/events/niveaux/${id_niveau}/parcours/${id_parcours}/debut/${debut}/fin/${fin}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List events', []))
    );
  }

  /** SAVE EVENTS */
  savePointages(id_niveau: string, id_parcours: string, debut: string, fin: string, event: any): Observable<any> {
    return this.http.post(endpoint + `/events/niveaux/${id_niveau}/parcours/${id_parcours}/debut/${debut}/fin/${fin}/save`, JSON.stringify(event), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List pointages', []))
    );
  }

  /** delete events Date NP */
  deleteAllEventsNPDate(id_niveau: string, id_parcours: string, debut: string, fin: string): Observable<any> {
    return this.http.delete(endpoint + `/events/niveaux/${id_niveau}/parcours/${id_parcours}/debut/${debut}/fin/${fin}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('delete events', []))
    );
  }

  /** delete event */
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(endpoint + `/events/${id}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('delete event', []))
    );
  }
}
