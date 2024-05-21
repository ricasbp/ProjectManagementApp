import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Team } from './team';
import { MessageService } from './message.service';
import { User } from './user';
import { Project } from './project';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsUrl: string = 'http://localhost:3074/teams';
  private teamUrl: string = 'http://localhost:3074/team';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
    responseType: 'text' as 'json'
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // FETCH USERS FROM A SPECIFIC TEAM
  getTeamUsers(id: string): Observable<User[]> {
    const url = `${this.teamUrl}/${id}/users`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log('fetched users from team with id: ' + id)),
      catchError(this.handleError<User[]>('getTeamUsers', []))
    ); 
  }

  // FETCH ALL TEAMS
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
    .pipe(
      tap(_ => this.log('fetched teams')),
      catchError(this.handleError<Team[]>('getTeams', []))
    );
  }

  // FETCH A SPECIFIC TEAM
  getTeam(id: string): Observable<Team> {
    const url = `${this.teamUrl}/${id}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => this.log(`fetched team id=${id}`)),
      catchError(this.handleError<Team>(`getTeam id=${id}`))
    );
  }

  // TEAM IS CREATED AND ADDED TO THE DATABASE
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamsUrl, team, this.httpOptions).pipe(
      tap((newTeam: Team) => this.log(`added team with id:` + newTeam)),
      catchError(this.handleError<Team>('addTeam'))
    );
  }

  // TEAM IS DELETED FROM THE DATABASE
  deleteTeam(id: string): Observable<Team> {
    const url = `${this.teamUrl}/${id}`;
    
    return this.http.delete<Team>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted team id=${id}`)),
      catchError(this.handleError<Team>('deleteTeam'))
    );
  }

  updateTeam(team: Team): Observable<Team> {
    const url = `${this.teamUrl}/${team._id}`;
    return this.http.put<Team>(url, team, this.httpOptions).pipe(
      tap(_ => this.log(`updated team with id=${team._id}`)),
      catchError(this.handleError<Team>('updateTeam'))
    );
  }


  // FETCH A SPECIFIC TEAM PROJECT
  getProject(id_Team: string): Observable<String> {
    const url = `${this.teamUrl}/${id_Team}/project`;
    return this.http.get<String>(url).pipe(
      tap(_ => this.log(`fetched project id=${id_Team}`)),
      catchError(this.handleError<String>(`getProject of team id=${id_Team}`))
    );
  }

  // AUXILIAR METHODS
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`TeamService: ${message}`);
  }
}
