import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { Item } from '../task';
import { Project } from '../project';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProjectService } from '../project.service';

import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  [x: string]: any;
  task: Task | undefined;
  admin: Boolean | undefined = false;

  projects: Project[] | undefined;
  users: User[] | undefined;
  selectedProject: Project | undefined;
  selectedUser: User | undefined;

  title: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private appComponent: AppComponent,
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.title = this.appComponent.title;
  }

  ngOnInit(): void {
    console.log("entrou aqui na  task")
    this.getTask();
    this.getProjects();
    this.getUsers();
    if (this.userService.user)
      this.admin = this.userService.user.admin;
  }

  getTask(): void {
    const iad = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(iad)
      .subscribe(task => this.task = task);
  }

  updateTask(): void {
    const progress = parseInt(prompt("Insert task progress")!);
    if (progress < 0 || progress > 100) {
      alert("progress must be a value between 0 and 100");
    } else {
      if (this.task) {
        this.task.progress = progress;
        this.taskService.updateTask(this.task)
        .subscribe(task => this.task = task);
      }
    } 

  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getProject(id :String): Project | undefined{
    var proj;
    if(this.projects){
      this.projects.forEach(element => {
        if(element._id === id)
        proj =  element
      });
    }
    return proj
  }

  getUser(id :String): User | undefined{
    var usr;
    if(this.users){
      this.users.forEach(element => {
        if(element._id === id)
        usr =  element
      });
    }
    return usr
  }


  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }

   getNotAssociatedUsers(): User[] {
    var notAssociatedUsers = []
    if(this.users){
      for(var i = 0; i < this.users.length; i++){
        if(!this.task?.users.includes(this.users[i]._id)){
          notAssociatedUsers.push(this.users[i]);
        }
      }
    }
    return notAssociatedUsers;
    
  }


  associateTaskToProject(): void {
    if (this.task && this.selectedProject) {
      this.selectedProject.tasks.push(this.task._id);
      this.projectService.updateProject(this.selectedProject).subscribe(
        project => console.log(project)
      );
      this.getProjects();
      this.task.project = this.selectedProject._id;
      this.taskService.updateTask(this.task).subscribe(
        task => this.task = task
      );
    }
  }

  associateUserToTask(): void {
    if (this.task && this.selectedUser) {
      this.task.users.push(this.selectedUser._id);
      this.taskService.updateTask(this.task).subscribe(
        task => this.task = task
      );
      console.log(this.task);
    }
  }

  desassociateUserToTask(user: String): void{
    if (this.task) {
      for (var i = 0; i < this.task.users.length; i++) {
        if (this.task.users[i] === user) {
          this.task.users.splice(i, 1);
        }
      }

      this.taskService.updateTask(this.task).subscribe(
        task => this.task = task
      );
    }
  }

  dessociateTaskProject(): void {
    if (this.task) {
      this.projectService.getProject(this.task.project).subscribe(
        project => {
          if (this.task) {
            for (var i = 0; i < project.tasks.length; i++) {
              if (project.tasks[i] === this.task._id) {
                project.tasks.splice(i, 1);
              }
            }

            this.projectService.updateProject(project).subscribe();
          }
        }
      );
      this.task.project = "";
      this.taskService.updateTask(this.task).subscribe(
        task => this.task = task
      );
    }
  }

  addItem(nome: String) {
    var counter = 0;
    if (this.task != undefined) {
      for (let i = 0, len = this.task?.items.length; i < len; i++) {
        if(!this.task.items[i].completed) {
          counter++;
        }
      }
    }
    if (!this.isAlphaNumeric(nome)) {
      window.alert("Cada item da lista deve ter um nome que só pode ter caracteres alfanuméricos.");
    }
    else if (nome.length < 4) {
      window.alert("Cada item da lista deve ter quatro caracteres no mínimo.");
    }
    else if (counter >= 7) {
      window.alert("A lista pode ter no máximo 7 itens no estado por completar.");
    }
    else {

      const item: Item = {
        name: nome as string,
        completed: false,
      };

      if (this.task) {
        this.task?.items.push(item);
        this.taskService.updateTask(this.task)
          .subscribe(task => this.task = task);
      }
    }
  }

  changeItemState(item:Item, task:Task, element:HTMLInputElement){
    var resp = confirm("Pretende confirmar alteração do estado do item: " + item.name + "?\nResponda \"sim\" em caso afirmativo");
    if (resp) {
      item.completed = element.checked;
      this.taskService.updateTask(task).subscribe();
    } else {
      element.checked = !element.checked;
    }
  }

  isAlphaNumeric(str: String) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };

}
