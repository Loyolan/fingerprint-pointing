import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from './global.service';

const endpoint: string = GlobalService.backDomain + GlobalService.backApiPath;
@Injectable({
  providedIn: 'root'
})
export class PointageService {
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

  /** Get pointages */
  allPointages(limit:number): Observable<any> {
    return this.http.get(endpoint + '/pointages/limit/'+ limit).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List pointages', []))
    );
  }

  /** Get pointages Date */
  allPointagesDate(debut: string, fin: string): Observable<any> {
    return this.http.get(endpoint + `/pointages/debut/${debut}/fin/${fin}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List pointages', []))
    );
  }

  /** Get pointages N P */
  allPointagesNP(id_niveau: string, id_parcours: string, limit:number): Observable<any> {
    return this.http.get(endpoint + `/pointages/niveaux/${id_niveau}/parcours/${id_parcours}/limit/${limit}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List pointages', []))
    );
  }

  /** Get pointages Date NP */
  allPointagesNPDate(id_niveau: string, id_parcours: string, debut: string, fin: string): Observable<any> {
    return this.http.get(endpoint + `/pointages/niveaux/${id_niveau}/parcours/${id_parcours}/debut/${debut}/fin/${fin}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List pointages', []))
    );
  }

  /** delete pointages Date NP */
  deleteAllPointagesNPDate(id_niveau: string, id_parcours: string, debut: string, fin: string): Observable<any> {
    return this.http.delete(endpoint + `/pointages/niveaux/${id_niveau}/parcours/${id_parcours}/debut/${debut}/fin/${fin}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('delete pointages', []))
    );
  }

  /** delete pointage */
  deletePointage(id: string): Observable<any> {
    return this.http.delete(endpoint + `/pointages/${id}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('delete pointage', []))
    );
  }

  getDatasets(annee: string){
    return endpoint + `/statistics/get_datasets/annees/${annee}`;
  }
}
