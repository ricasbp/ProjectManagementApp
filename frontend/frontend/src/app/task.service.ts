import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';
import { Task } from './task';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = 'http://localhost:3074/task';  // URL to web api
  private tasksUrl = 'http://localhost:3074/tasks'; 
  public myTasks: Task[] | undefined;

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTask(id: String): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  addTask(task: Task): Observable<Task> {
    console.log(task);
    return this.http.post<Task>(this.taskUrl, task, this.httpOptions).pipe(
      tap((task: Task) => this.log(`added task w/ id=${task.name}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(task: Task): Observable<any> {
    const id = task._id;
    const url = `${this.taskUrl}/${id}`
  
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  deleteTask(id: string): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

    private log(message: string) {
      this.messageService.add(`TaskService: ${message}`);
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

