import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = "http://127.0.0.1:8000/eni/api/fingerprint_pointing";
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
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

  /** Get etudiant ANNEE UNIV*/
  allEtudiantsAnneeUniv(id_annee: string): Observable<any> {
    return this.http.get(endpoint + `/etudiants/annee_univs/${id_annee}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List etudiants', []))
    );
  }

  /** Get etudiant ANNEE UNIV (PARCOURS) */
  allEtudiantsAnneeUnivParcours(id_annee: string, id_parcours: string): Observable<any> {
    return this.http.get(endpoint + `/etudiants/annee_univs/${id_annee}/parcours/${id_parcours}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List etudiants', []))
    );
  }

  /** Get etudiant ANNEE UNIV (NIVEAUX) */
  allEtudiantsAnneeUnivNiveau(id_annee: string, id_niveau: string): Observable<any> {
    return this.http.get(endpoint + `/etudiants/annee_univs/${id_annee}/niveaux/${id_niveau}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List etudiants', []))
    );
  }

  /** Get etudiant ANNEE UNIV (NIVEAUX/PARCOURS) */
  allEtudiantsAnneeUnivNiveauParcours(id_annee: string, id_niveau: string, id_parcours: string): Observable<any> {
    return this.http.get(endpoint + `/etudiants/annee_univs/${id_annee}/niveaux/${id_niveau}/parcours/${id_parcours}`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List etudiants', []))
    );
  }

  /** GET ONE etudiant */
  getOneEtudiant(id: string): Observable<any> {
    return this.http.get(`${endpoint}/etudiants/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE etudiant', []))
    );
  }

  /** Add new etudiant */
  addEtudiant(etudiant: any): Observable<any> {
    return this.http.post(`${endpoint}/etudiants/add`, JSON.stringify(etudiant), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST etudiant', []))
    );
  }

  /** Update an etudiant */
  updateEtudiant(id: string, etudiant: any): Observable<any> {
    return this.http.put(`${endpoint}/etudiants/${id}/update`, JSON.stringify(etudiant), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT etudiant', []))
    );
  }

  /** Delete an etudiant */
  deleteEtudiant(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/etudiants/${id}/delete`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE etudiant', []))
    );
  }
}
