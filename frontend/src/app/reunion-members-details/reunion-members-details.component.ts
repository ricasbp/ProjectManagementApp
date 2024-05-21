import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { Item } from '../task';
import { Project } from '../project';
import { Reunion } from '../reunion';
import { User } from '../user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProjectService } from '../project.service';

import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
import { MarcarReuniaoUtilizadoresService } from '../marcar-reuniao-utilizadores.service';

@Component({
  selector: 'app-reunion-members-details',
  templateUrl: './reunion-members-details.component.html',
  styleUrls: ['./reunion-members-details.component.css']
})
export class ReunionMembersDetailsComponent implements OnInit {
  reunion: Reunion | undefined;
  title: string;
  admin: boolean | undefined;
  membros: User[] = [];


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent,
    private reunionService : MarcarReuniaoUtilizadoresService,
    private userService: UserService,
  ) {     this.title = this.appComponent.title;
  }

  ngOnInit(): void {
    this.getReunion();


    if(this.userService.user)
      this.admin = this.userService.user.admin;
  }


  getReunion(): void {
    const iad = String(this.route.snapshot.paramMap.get('id'));
    this.reunionService.getReunion(iad)
      .subscribe(reunion => {
        this.reunion = reunion
        console.log("boas");
        console.log(this.reunion);
      });
  }
  }

  
    
    
  





