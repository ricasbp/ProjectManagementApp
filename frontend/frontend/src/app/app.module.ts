import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

import { UsersComponent } from './users/users.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { MarcarReuniaoUtilizadoresComponent } from './marcar-reuniao-utilizadores/marcar-reuniao-utilizadores.component';
import { ReunionMembersDetailsComponent } from './reunion-members-details/reunion-members-details.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    AppBarComponent,
    ProjectsComponent,
    DashboardComponent,
    MessagesComponent,
    TeamsComponent,
    TeamDetailComponent,
    UsersComponent,
    TaskDetailComponent,
    TasksComponent,
    LoginComponent,
    ProjectDetailComponent,
    MarcarReuniaoUtilizadoresComponent,
    ReunionMembersDetailsComponent,
    ScheduleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
