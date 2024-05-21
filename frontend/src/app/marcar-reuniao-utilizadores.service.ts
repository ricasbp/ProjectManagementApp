import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './user';
import { Reunion } from './reunion';

import { MessageService } from './message.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})





export class MarcarReuniaoUtilizadoresService {
  private urlreunions = 'http://localhost:3074/reunions';
  private urlreunion = 'http://localhost:3074/reunion';


  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  getReunions(): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(this.urlreunions)
      .pipe(
        tap(_ => this.log('fetched reunions')),
        catchError(this.handleError<Reunion[]>('getReunions', []))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getReunion(id: String): Observable<Reunion> {
    const url = `${this.urlreunion}/${id}`;
    return this.http.get<Reunion>(url).pipe(
      tap(_ => this.log(`fetched reunion id=${id}`)),
      catchError(this.handleError<Reunion>(`getReunion id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addReunion(reunion: Reunion): Observable<Reunion> {
    console.log("reuniao aq")
    console.log(reunion)
    return this.http.post<Reunion>(this.urlreunions, reunion, this.httpOptions).pipe(
      tap((newProject: Reunion) => this.log(`added reunion w/ id=${newProject._id}`)),
      catchError(this.handleError<Reunion>('addReunion'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** Log a ProjectService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);

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