import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { Item } from '../task';
import { Project } from '../project';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProjectService } from '../project.service';

import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  title: string;
  admin: boolean | undefined;
  tarefas: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent,
    private projectService: ProjectService,
    private taskService : TaskService,
    private userService: UserService,
  ) {
    this.title = this.appComponent.title;
  }

  ngOnInit(): void {
    this.getProject();


    if(this.userService.user)
      this.admin = this.userService.user.admin;
  }

  getProject(): void {
    const iad = String(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(iad)
      .subscribe(project => {
        this.project = project
        this.getTasks()
      });
  }

  getTasks(): void {
    var tarefas = this.project?.tasks;
    //console.log(tarefas)
    if(tarefas != undefined) {
      for(var i = 0 ; i < tarefas?.length ; i++) {
        var tarefa = this.taskService.getTask(tarefas[i]);
        tarefa.subscribe(
          tarefa => {
            if(tarefa != undefined) {
              this.tarefas.push(tarefa);
            }
          }
        )
        
      }
    }
    
    
  }

}

