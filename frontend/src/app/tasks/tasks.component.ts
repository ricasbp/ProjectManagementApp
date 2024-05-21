import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { Task } from '../task';
import { Item } from '../task';
import { AppComponent } from '../app.component';
import { User } from '../user';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  myTasks: Task[] = [];
  title: string;
  admin: Boolean | undefined = false;
  viewAll: Boolean;

  constructor(private taskService: TaskService,
    private userService: UserService,
    private appComponent: AppComponent,) {
    this.title = this.appComponent.title;
    this.viewAll = true;
  }


  ngOnInit(): void {
    this.getTasks();
    if (this.userService.user)
      this.admin = this.userService.user.admin;

  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      tasks.forEach(element => {
        if (this.userService.user) {
          if (element.users.includes(this.userService.user?._id)) {
            this.myTasks.push(element);
            this.taskService.myTasks = this.myTasks;
          }
        }
      });
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task._id)
      .subscribe(() => this.getTasks());
    this.getTasks();

  }

  addTask(name: string, priority: string, date_inicio: string, date_fim: string) {
    var message = ""
    if (!name.trim()) {
      message = 'Por favor insira um nome!';
      alert(message);
    }

    var data_fim = new Date(date_fim);
    var data_inicio = new Date(date_inicio);
    var valid = true
    if (data_inicio.getTime()) {
      if (!data_fim.getTime()) {
        window.alert("Data de fim deve ser preenchida.")
        valid = false;
      }
      else if (data_fim.getTime() && (data_fim < data_inicio)) {
        window.alert("O projeto deve ter uma data de início (que terá de ser igual ou posterior à data atual) e pode ter uma data de fim (que terá de ser posterior à data de início).");
        valid = false;
      }
    }

    if (nameIsValid(name) && this.userService.user && valid) {
      var progress = 0
      var users: String[] = [this.userService.user._id];
      var items: Item[] = [];
      var project = "";
      var _id = "";
      var data_inicio: Date = data_inicio;
      var data_fim: Date = data_fim;

      if(data_inicio.getTime()){
        var task = { _id, name, priority, users, project, progress, items , data_inicio,  data_fim} as Task;
      }else{
        var task = { _id, name, priority, users, project, progress, items } as unknown as Task;
      }
      this.taskService
        .addTask(task)
        .subscribe(task => {
          this.tasks.push(task)
        });

    } else {
      alert(
        'Nome só pode ter caracteres alfanuméricos e deve ter quatro caracteres no mínimo'
      );
    }

    
  }

  switchViewMode() {
    this.viewAll = !this.viewAll;
  }
}



function nameIsValid(nome: String) {
  if (typeof nome != 'string') return false;
  if (nome.length < 4) return false;
  var code, i, len;

  for (i = 0, len = nome.length; i < len; i++) {
    code = nome.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}
