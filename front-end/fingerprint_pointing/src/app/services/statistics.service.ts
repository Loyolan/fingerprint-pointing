import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from './global.service';

const endpoint: string = GlobalService.backDomain + GlobalService.backApiPath;
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
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

  agilitiesOfStudents(annee: string): Observable<any> {
    return this.http.get(`${endpoint}/statistics/etudiants_agility/annees/${annee}`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('stt', []))
    );
  }

  sttPointedOrNot(annee: string): Observable<any> {
    return this.http.get(`${endpoint}/statistics/stt_pointed_or_not/annees/${annee}`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('stt', []))
    );
  }
}
