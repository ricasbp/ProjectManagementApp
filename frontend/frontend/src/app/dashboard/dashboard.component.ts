import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string;
  admin: boolean | undefined;
  tasks: Task[] | undefined;
  user: User | undefined;
  constructor(private appComponent: AppComponent,
    private userService: UserService,
    private taskService: TaskService) { 
    this.title = this.appComponent.title;
  }

  ngOnInit(): void {
    this.tasks = this.taskService.myTasks;
    this.user = this.userService.user;
    if(this.userService.user) {
      this.admin = this.userService.user.admin;
    }
  }
}