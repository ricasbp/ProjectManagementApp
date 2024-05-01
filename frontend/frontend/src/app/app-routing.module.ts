import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ProjectsComponent } from './projects/projects.component';

import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';

import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { MarcarReuniaoUtilizadoresComponent } from './marcar-reuniao-utilizadores/marcar-reuniao-utilizadores.component'
import { ReunionMembersDetailsComponent } from './reunion-members-details/reunion-members-details.component';

import { LoginComponent } from './login/login.component';
import { MainAppComponent } from './main-app/main-app.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: '', component: MainAppComponent, children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'team/:id', component: TeamDetailComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'taskdetail/:id', component: TaskDetailComponent },
    { path: 'users', component: UsersComponent },
    { path: 'projectdetail/:id', component: ProjectDetailComponent },
    { path: 'marcarreuniaoutilizadores', component: MarcarReuniaoUtilizadoresComponent},
    { path: 'reunionusersdetail/:id', component: ReunionMembersDetailsComponent },
    { path: 'schedule', component: ScheduleComponent }
  ]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
