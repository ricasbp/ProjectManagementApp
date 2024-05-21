import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  addUser: User | undefined;
  users: User[] = [];
  teams: Team[] = [];
  addMembers: User[] = [];
  title: string;
  admin: Boolean | undefined = false;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private appComponent: AppComponent
  ) {
    this.title = this.appComponent.title;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getTeams();
    this.addMembers = [];
    if(this.userService.user)
      this.admin = this.userService.user.admin;
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  
  getTeams(): void {
    this.teamService.getTeams()
    .subscribe(teams => this.teams = teams);
  }

  addTeam(name: string, members: User []): void {
    if (this.checkIfNameAvailable(name) && this.isAlphaNumeric(name) && name.length >= 4) {
      if (!name) { return; }
      this.teamService.addTeam({name, members} as Team)
        .subscribe(team => {
          this.teams.push(team);
          this.getTeams();
        });
    } else {
      alert("A equipa deve ter um nome que só pode ter caracteres alfanuméricos, deve ter quatro caracteres no mínimo, e tem de ser único.");
    }
    this.addMembers = [];

    Array.from(document.getElementsByClassName('add-member')).forEach(function (element) {
      element.classList.remove("selected");
    });
  }

  deleteTeam(team: Team): void {
    this.teams = this.teams.filter(t => t !== team);
    this.teamService.deleteTeam(team._id).subscribe();
  }

  addMember(el: HTMLElement, user: User): void {
    if (el.classList.contains("selected")) {
      this.addMembers = this.addMembers.filter(item => item !== user);
      el.classList.remove("selected");
    } else {
      this.addMembers.push(user);
      el.classList.add("selected");
    }
  }

  isAlphaNumeric(str: string) {
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
  }

  checkIfNameAvailable(name: string) {
    var ret = true;
    this.teams.forEach(team => {
      if (team.name == name) {
        ret = false;
      }
    });
    return ret;
  }
}
