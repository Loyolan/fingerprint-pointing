import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = "http://127.0.0.1:8000/eni/api/fingerprint_pointing";
@Injectable({
  providedIn: 'root'
})
export class AnneeUnivService {
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

  /** Get annee_univs */
  allAnneeUnivs(): Observable<any> {
    return this.http.get(endpoint + '/annee_univs/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List annee_univs', []))
    );
  }

  /** GET ONE annee_univs */
  getOneAnneeUniv(id: string): Observable<any> {
    return this.http.get(`${endpoint}/annee_univs/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE annee_univs', []))
    );
  }

  /** Add new annee_univs */
  addAnneeUniv(annee_univs: any): Observable<any> {
    return this.http.post(`${endpoint}/annee_univs/add`, JSON.stringify(annee_univs), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST annee_univs', []))
    );
  }

  /** Update an annee_univs */
  updateAnneeUniv(id: string, annee_univs: any): Observable<any> {
    return this.http.put(`${endpoint}/annee_univs/${id}/update`, JSON.stringify(annee_univs), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT annee_univs', []))
    );
  }

  /** Delete an annee_univs */
  deleteAnneeUniv(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/annee_univs/${id}/delete`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE annee_univs', []))
    );
  }
}
