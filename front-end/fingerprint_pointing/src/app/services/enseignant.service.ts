import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = "http://127.0.0.1:8000/eni/api/fingerprint_pointing";
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
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

  /** Get enseignant */
  allEnseignants(): Observable<any> {
    return this.http.get(endpoint + '/enseignants/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List enseignants', []))
    );
  }

  /** Get enseignant */
  allMatieresEnseignant(id: string): Observable<any> {
    return this.http.get(endpoint + '/enseignants/' + id + '/matieres').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Matieres enseignants', []))
    );
  }

  /** GET ONE enseignant */
  getOneEnseignant(id: string): Observable<any> {
    return this.http.get(`${endpoint}/enseignants/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE enseignant', []))
    );
  }

  /** Add new enseignant */
  addEnseignant(enseignant: any): Observable<any> {
    return this.http.post(`${endpoint}/enseignants/add`, JSON.stringify(enseignant), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST enseignant', []))
    );
  }

  /** Update an enseignant */
  updateEnseignant(id: string, enseignant: any): Observable<any> {
    return this.http.put(`${endpoint}/enseignants/${id}/update`, JSON.stringify(enseignant), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT enseignant', []))
    );
  }

  /** Delete an enseignant */
  deleteEnseignant(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/enseignants/${id}/delete`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE enseignant', []))
    );
  }
}
