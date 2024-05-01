import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './user';
import { MessageService } from './message.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Period } from './period';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUsers = 'http://localhost:3074/users';
  private urlUser = 'http://localhost:3074/user';
  private periodURL = 'http://localhost:3074/period';
  public user: User | undefined;
  public admin: Boolean | undefined;

  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUsers)
      .pipe(
        tap(_ => this.log('fetched Users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: String): Observable<User> {
    const url = `${this.urlUser}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  
  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.urlUsers, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added User w/ id=${newUser._id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  getUserByName(name: string) {
    const url = `${this.urlUser}/${name}`;console.log(url);
    return this.http.get<User>(url).pipe(
          tap(_ => this.log(`fetched User name=${name}`)),
          catchError(this.handleError<User>(`getUserByName name=${name}`))
        );
  }

  tryLogin(name: string, senha: string): Observable<User> {
    const url = `${this.urlUsers}/login`;
    return this.http.post<User>(url, {name: name, senha: senha}, this.httpOptions).pipe(
      catchError(this.handleError<User>(`login name=${name}`))
    );
  }

  tryLoginv2(name: string, senha: string): Observable<any> {
    const url = `${this.urlUsers}/login`;
    return this.http.post<any>(url, {name: name, senha: senha}, this.httpOptions).pipe(
      catchError(this.handleError<any>(`login name=${name}`))
    );
  }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  createPeriod(begin: string, end: string): Observable<Period> {
    return this.http.post<Period>(this.periodURL, {begin_date: begin, end_date: end}, this.httpOptions).pipe(
      tap((newPeriod: Period) => this.log(`added period with id:` + newPeriod)),
      catchError(this.handleError<Period>('addPeriod'))
    );
  }

  getPeriods(id: string): Observable<Period[]> {
    const url = `${this.urlUser}/${id}/periods`;
    return this.http.get<Period[]>(url).pipe(
      tap(_ => this.log(`fetched periods from user with id: ` + id)),
      catchError(this.handleError<Period[]>('getUserPeriods', []))
    ); 
  }

  addPeriod(period: Period, id: string): Observable<Period> {
    const url = `${this.urlUser}/${id}/period`;
    console.log(url);
    return this.http.put<Period>(url, {period: period}, this.httpOptions).pipe(
      tap(_ => this.log(`added period to user with id: ` + id)),
      catchError(this.handleError<Period>('addPeriod'))
    );
  }

  getAllPeriods(): Observable<Period[]> {
    return this.http.get<Period[]>("http://localhost:3074/periods")
      .pipe(
        catchError(this.handleError<Period[]>('getAllPeriods', []))
      );
  }
  
  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);

  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
