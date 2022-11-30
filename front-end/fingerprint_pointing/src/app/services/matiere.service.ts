import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from './global.service';

const endpoint: string = GlobalService.backDomain + GlobalService.backApiPath;
@Injectable({
  providedIn: 'root'
})
export class MatiereService {
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

  /** Get matiere */
  allMatieres(): Observable<any> {
    return this.http.get(endpoint + '/matieres/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List matieres', []))
    );
  }

  /** GET ONE matiere */
  getOneMatiere(id: string): Observable<any> {
    return this.http.get(`${endpoint}/matieres/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE matiere', []))
    );
  }

  /** Add new matiere */
  addMatiere(id_prof: string, matiere: any): Observable<any> {
    return this.http.post(`${endpoint}/matieres/enseignants/${ id_prof }/add`, JSON.stringify(matiere), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST matiere', []))
    );
  }

  /** Update an matiere */
  updateMatiere(id: string, matiere: any): Observable<any> {
    return this.http.put(`${endpoint}/matieres/${id}/update`, JSON.stringify(matiere), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT matiere', []))
    );
  }

  /** Update an matiere */
  changeEnseignant(id: string, id_prof: string): Observable<any> {
    return this.http.put(`${endpoint}/matieres/${id}/enseignants/${id_prof}`,  this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('CHANGE PROF', []))
    );
  }

  /** Delete an matiere */
  deleteMatiere(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/matieres/${id}/delete`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE matiere', []))
    );
  }
}
