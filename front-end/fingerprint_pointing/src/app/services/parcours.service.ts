import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = "http://127.0.0.1:8000/eni/api/fingerprint_pointing";
@Injectable({
  providedIn: 'root'
})
export class ParcoursService {
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

  /** Get parcours */
  allParcours(): Observable<any> {
    return this.http.get(endpoint + '/parcours/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List parcourss', []))
    );
  }

  /** GET ONE parcours */
  getOneParcours(id: string): Observable<any> {
    return this.http.get(`${endpoint}/parcours/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE parcours', []))
    );
  }

  /** Add new parcours */
  addParcours(parcours: any): Observable<any> {
    return this.http.post(`${endpoint}/parcours/add`, JSON.stringify(parcours), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST parcours', []))
    );
  }

  /** Update an parcours */
  updateParcours(id: string, parcours: any): Observable<any> {
    return this.http.put(`${endpoint}/parcours/${id}/update`, JSON.stringify(parcours), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT parcours', []))
    );
  }

  /** Delete an parcours */
  deleteParcours(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/parcours/${id}/delete`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE parcours', []))
    );
  }
}
