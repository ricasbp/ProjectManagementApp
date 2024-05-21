import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from './project';
import { MessageService } from './message.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private urlprojects = 'http://localhost:3074/projects';
  private urlproject = 'http://localhost:3074/project';


  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>("http://localhost:3074/projects")
      .pipe(
        tap(_ => this.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: String): Observable<Project> {
    const url = `${this.urlproject}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addProject(project: Project): Observable<Project> {
    console.log(project);
    return this.http.post<Project>(this.urlprojects, project, this.httpOptions).pipe(
      tap(_ => this.log(`added project w/ id=${project._id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  updateProject(project: Project): Observable<Project> {
    const url = `${this.urlproject}/${project._id}`

    return this.http.put<Project>(url, project, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${project._id}`)),
      catchError(this.handleError<Project>('updateTask'))
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
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
