import { Component, OnChanges, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  outUsers: User [] = [];
  members: User[] = [];
  newMembers: User[] = [];
  
  team!: Team;
  addUser!: User;
  title: string;
  admin: Boolean | undefined = false;
  project!: Project | null;

  listOfAllProjects: Project[] = [];


  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.title = this.appComponent.title;
  }
/* Master
  ngOnInit(): void {
    this.getOutUsers();
    this.getTeam();
    this.setAddMembers();
  }
*/

  //DELETE I GUESS
  ngOnChanges(): void {
    //console.log("ngOnChanges")
    //console.log(this.team)
  }

  ngOnInit(): void {
    this.setMembers();
    this.getTeam();
    //this.getProjects();  chamados no getTeam() para ser sincrono
    //this.setProject(); 
    if(this.userService.user)
      this.admin = this.userService.user.admin;
  }

  addProject(project: Project): void{
    this.project = project

    const newTeam: Team = {
      name: this.team.name,
      _id: this.team._id,
      members: this.members,
      project: this.project
    };
    
    this.teamService.updateTeam(newTeam).subscribe(team => {
      this.team = newTeam;
      //console.log(this.team)
      });
  }


  getProjects(): void {
    this.projectService.getProjects()
    .subscribe(projects => {
      this.listOfAllProjects = projects
    });
  }


  setProject(): void {
    var projectID
    this.teamService.getProject(this.team._id)
    .subscribe(res => {
      projectID = res
      this.projectService.getProject(projectID)
      .subscribe(res => {
        this.project = res
      });
    });
  }


  setMembers(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.teamService.getTeamUsers(id)
    .subscribe(teamUsers => {
      this.members = teamUsers
      //Tenho de chamar o getOutUsers() aqui em vez do ngOnInit() para ser por por ordem
      this.getOutUsers();
    } );

  }

  //Utilizadores que não estão na equipa
  getOutUsers(): void {
    this.userService.getUsers()
    .subscribe(users =>{
      this.outUsers = users
      //Faz a diferença entre o 1ºconjunto e o 2º;
      //Filter: false eliminado // True mantem
      let difference = this.outUsers.filter(x =>{

      let exists = true;
      this.members.every(item => {
        if(x._id == item._id ){
          exists = false;
          return false;
        }
        return true;
      })
      return exists
    });
    this.outUsers = difference

    //console.log(this.members);
    //console.log(this.outUsers);
    //console.log(this.team);
    
    } );

    
  }

  getUser(name: string): void {
    this.userService.getUserByName(name)
    .subscribe(user => this.addUser = user);
  }

  getTeam(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.teamService.getTeam(id)
      .subscribe(team => {
        this.team = team
        this.getProjects();
        console.log("this.team.project")
        if(this.team.project != null){
          console.log("Entrei e o meu this project é")
          console.log(this.project)
          this.setProject();
        }
      });
  }


  addMember(member: User): void {
    this.members.push(member);
  
    const newTeam: Team = {
      name: this.team.name,
      _id: this.team._id,
      members: this.members,
      project: this.project
    };

    this.teamService.updateTeam(newTeam).subscribe(team => {
      //console.log(this.members)
      this.team = newTeam

      this.getOutUsers();
      });
  }

  deleteMember(member: User): void {
    this.newMembers = this.members.filter(m => m !== member);
    //console.log(this.newMembers)
  
    const newTeam: Team = {
      name: this.team.name,
      _id: this.team._id,
      members: this.newMembers,
      project: this.project
      
    };

    this.teamService.updateTeam(newTeam).subscribe(team => {
      this.outUsers.push(member)
      this.members = this.newMembers
      this.team = newTeam
      });
  }

  deleteProject(): void {
    const newTeam: Team = {
      name: this.team.name,
      _id: this.team._id,
      members: this.newMembers,
      project: null
    };

    this.teamService.updateTeam(newTeam).subscribe(team => {
      this.team = newTeam
      this.project = null
      });
  }

  update(name: string, members: User []): void {
    this.teamService.updateTeam({name, members} as Team);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
