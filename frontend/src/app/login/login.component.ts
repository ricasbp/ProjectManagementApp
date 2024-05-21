import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  user_tasks: Task[] = [];
    
  constructor(private UserService: UserService,
    private router: Router,
    private appComponent: AppComponent,
    private taskService: TaskService) {
      this.title = this.appComponent.title;
    }
  

  ngOnInit(): void {
    
  }

  
  login(name: string, senha: string) {
    this.UserService.tryLogin(name, senha)
    .subscribe(user => {
      if (user.name != "") {
        this.UserService.user = user;
        this.taskService.getTasks()
        .subscribe((tasks) => {
          tasks.forEach(element => {
            if(user) {
              if(element.users.includes(user._id)) {
                this.user_tasks.push(element);
              }
            }
          })
        });
        this.taskService.myTasks = this.user_tasks;
        this.router.navigate(["/dashboard"]);
      } else {
        window.alert("Login not successfull");
      }
    });
  }
}
