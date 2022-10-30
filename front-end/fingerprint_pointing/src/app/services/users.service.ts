import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = "http://127.0.0.1:8000/eni/api/figerprint_pointing";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * HTTP OPTIONS
   */
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'X-CSRFToken': ''
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

  /** Get user */
  allUsers(): Observable<any> {
    return this.http.get(endpoint + '/users/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List users', []))
    );
  }

  /** GET ONE user */
  getOneUser(id: string): Observable<any> {
    return this.http.get(`${endpoint}/users/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE user', []))
    );
  }

  /** Add new user */
  addUser(user: any): Observable<any> {
    return this.http.post(`${endpoint}/users/add`, JSON.stringify(user), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST user', []))
    );
  }

  /** Update an user */
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${endpoint}/users/${id}/update`, JSON.stringify(user), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT user', []))
    );
  }

  /** Update an user */
  changePasswordUser(id: string, pwd: any): Observable<any> {
    return this.http.put(`${endpoint}/users/${id}/change_pwd`, JSON.stringify(pwd), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PWD user', []))
    );
  }

  /** Delete an user */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/users/${id}`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE user', []))
    );
  }

  authentification(n: string, p: string): Observable<any> {
    return this.http.get(`${endpoint}/auth/user/${n}/password/${p}`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE user', []))
    );
  }

  /** Set user information in session after login */
  addUserToSession(user: any) {
    sessionStorage.setItem('id', user.id)
    sessionStorage.setItem('nom', user.nom);
    sessionStorage.setItem('password', user.password);
  }

  /** Reset the user inforamtion in session after logout */
  removeUserSession() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nom');
    sessionStorage.removeItem('password');
  }

  /** Get the user information save in session */
  getUserSession() {
    const user = {
      id: sessionStorage.getItem('id'),
      nom: sessionStorage.getItem('nom'),
      password: sessionStorage.getItem('password')
    }
    return user;
  }
}
