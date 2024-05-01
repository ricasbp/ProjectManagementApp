import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  authenticatedUser: User | undefined
  title: String

  constructor(
    private router: Router,
    private userServices: UserService,
    private appComponent: AppComponent,
  ) {
    this.title = appComponent.title;
  }

  ngOnInit(): void {
    this.authenticatedUser = this.userServices.user;
    if(!this.authenticatedUser || this.authenticatedUser == undefined)
      this.router.navigate(["/login"]);
  }

}
