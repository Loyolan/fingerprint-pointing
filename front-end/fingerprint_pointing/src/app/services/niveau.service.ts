import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from './global.service';

const endpoint: string = GlobalService.backDomain + GlobalService.backApiPath;
@Injectable({
  providedIn: 'root'
})
export class NiveauService {
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

  /** Get niveau */
  allNiveaus(): Observable<any> {
    return this.http.get(endpoint + '/niveaux/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List niveaux', []))
    );
  }

  /** GET ONE niveau */
  getOneNiveau(id: string): Observable<any> {
    return this.http.get(`${endpoint}/niveaux/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE niveau', []))
    );
  }

  /** Add new niveau */
  addNiveau(niveau: any): Observable<any> {
    return this.http.post(`${endpoint}/niveaux/add`, JSON.stringify(niveau), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST niveau', []))
    );
  }

  /** Update an niveau */
  updateNiveau(id: string, niveau: any): Observable<any> {
    return this.http.put(`${endpoint}/niveaux/${id}/update`, JSON.stringify(niveau), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT niveau', []))
    );
  }

  /** Delete an niveau */
  deleteNiveau(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/niveaux/${id}/delete`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE niveau', []))
    );
  }
}
