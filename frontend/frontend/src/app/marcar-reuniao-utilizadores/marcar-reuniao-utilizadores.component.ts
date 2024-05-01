import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Reunion } from '../reunion';
import { Team } from '../team';
import { TeamService } from '../team.service';

import { UserService } from '../user.service';
import { MarcarReuniaoUtilizadoresService } from '../marcar-reuniao-utilizadores.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-marcar-reuniao-utilizadores',
  templateUrl: './marcar-reuniao-utilizadores.component.html',
  styleUrls: ['./marcar-reuniao-utilizadores.component.css']
})
export class MarcarReuniaoUtilizadoresComponent implements OnInit {
  addUser: User | undefined;
  users: User[] = [];
  reunions: Reunion[] = [];
  myReunions: Reunion[] = [];
  addMembers: User[] = [];
  dates: string[] = []
  title: string;
  admin: Boolean | undefined = false;
  min: Number = 0;
  max: Number = 50;
  step: Number = 10;
  time: number = 30;
  user : User | undefined;
  viewAll: Boolean;

  toggle = true;
  status = 'Enable'; 

  teams: Team[] = [];
  selectedTeam: Team | undefined;
  reunionView: Boolean;


  incTime() {
    if(this.time == 480) {
      window.alert("Uma reunião não pode durar mais de oito horas.")
    }
    else {
      this.time += 30;
    }
  }

  decTime() {
    if(this.time == 30) {
      window.alert("Uma reunião não pode demorar menos de 30 minutos.")
    }
    else {
      this.time -= 30;
    }
  }
  

  constructor(
    private userService: UserService,
    private reunionService: MarcarReuniaoUtilizadoresService,
    private appComponent: AppComponent,
    private teamService: TeamService

  ) {
    this.title = this.appComponent.title;
    this.viewAll = true;
    this.reunionView = true;
  }

  schedule(nome : String, data : string): void {
    

    if(!nome) {
      window.alert("<Erro> Insira um nome para a reuniao!")
    }
    else if(this.addMembers.length == 0) {
      window.alert("<Erro> Escolha membros para adicionar a reuniao!")
    }
    else {
      var date_data_inicio = new Date(data);
      var date_data_fim = new Date(data)

      date_data_fim.setMinutes(date_data_inicio.getMinutes() + this.time)
      var data_fim = date_data_fim.toString();
      var data_inicio = date_data_inicio.toString();

      var membros = this.addMembers
      this.reunionService.addReunion({nome, membros, data_inicio, data_fim} as Reunion)
              .subscribe(hero => {
                this.getReunions();
                this.dates = []
                window.alert("Reuniao agendada")
              });
      }
    
  }

  scheduleTeam(nome : String, data : string): void {
    

    if(!nome) {
      window.alert("<Erro> Insira um nome para a reuniao!")
    }
    else {
      var date_data_inicio = new Date(data);
      var date_data_fim = new Date(data)

      date_data_fim.setMinutes(date_data_inicio.getMinutes() + this.time)
      var data_fim = date_data_fim.toString();
      var data_inicio = date_data_inicio.toString();

      if (this.selectedTeam) {
        var team = this.selectedTeam;
        var membros = this.selectedTeam.members;

        this.reunionService.addReunion({nome, membros, data_inicio, data_fim, team} as Reunion)
                .subscribe(reunion => {
                  this.getReunions();
                  this.dates = []
                  window.alert("Reuniao agendada")
                });
        }
      }
  }

  checkTeamAvailability(inicio : string, fim : string) {
    if(!(inicio && fim)) {
      window.alert("<Erro> Insira um intervalo de datas")
    } else if (this.selectedTeam){
      this.dates = []
      var data_inicio = new Date(inicio)

      var data_fim = new Date(fim)

      for (var d = data_inicio; d <= data_fim; d.setDate(d.getDate() + 1)) {
        if (!(d.getDay() == 0 || d.getDay() == 6)) {
          data_inicio.setHours(9, 30, 0, 0);

          var date_temp = new Date(d.toString());
          date_temp.setHours(17,30,0,0)
          var colisao = false;

      
          for (var x = d; x < date_temp; x.setMinutes(x.getMinutes()+30)) {
            colisao = false

            for(var i = 0; i < this.reunions.length ; i = i + 1) {

                for(var j = 0 ; j < this.reunions[i].membros.length ; j = j +1 ) {
                  for(var k = 0 ; k < this.selectedTeam.members.length ; k ++) {
                    
                    if(this.reunions[i].membros[j]._id == this.selectedTeam.members[k]._id) {
                      //houve intersecao
                      var data_fim_teste = new Date(x);
                      data_fim_teste.setMinutes(data_fim_teste.getMinutes() + this.time);
                      var data_inicio_existente = new Date(this.reunions[i].data_inicio);
                    


                      var data_fim_existente = new Date(this.reunions[i].data_fim)

                      //10:00 - 10:30
                      //9:30 - 10:30

                      var condicao = data_fim_teste < data_inicio_existente || x > data_fim_existente;
                      if(!condicao) {
                        colisao = true;
                      }
                    }
                  }
                }
            }
            if(!colisao) {
              this.dates.push(x.toString().split("GMT")[0])
            }
          }
        }
      }
      if(this.dates.length == 0) {
        window.alert("Não há horários disponiveis.")
      } 
      else {
        window.alert("Escolha uma data na lista abaixo.")
      }


    }
  }




  ngOnInit(): void {
    this.getUsers();
    this.addMembers = [];
    if(this.userService.user) {
      this.admin = this.userService.user.admin;
      this.user = this.userService.user;
    }
    this.getReunions();
    this.getTeams();
      
  }

  getTeams() {
    this.teamService.getTeams()
    .subscribe(teams => this.teams = teams);
  }  

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  getReunions(): void {
    this.reunionService.getReunions()
    .subscribe(reunions => {
      this.reunions = reunions;
      this.myReunions = []
      
      
      for (var i = 0 ; i < reunions.length ; i++) {
        for (var j = 0 ; j < reunions[i].membros.length ; j++) {
          if(this.user && reunions[i].membros[j]._id == this.user?._id) {
            this.myReunions.push(reunions[i])
          }
        }
      }
      
      
      
    });
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

  

  checkAvailability(inicio : string, fim : string) {
    if(!(inicio && fim)) {
      window.alert("<Erro> Insira um intervalo de datas")
    }
    else {
      this.dates = []
      var data_inicio = new Date(inicio)

      var data_fim = new Date(fim)

      for (var d = data_inicio; d <= data_fim; d.setDate(d.getDate() + 1)) {
        if (!(d.getDay() == 0 || d.getDay() == 6)) {
          data_inicio.setHours(9, 30, 0, 0);

          var date_temp = new Date(d.toString());
          date_temp.setHours(17,30,0,0)
          var colisao = false;

      
          for (var x = d; x < date_temp; x.setMinutes(x.getMinutes()+30)) {
            colisao = false

            for(var i = 0; i < this.reunions.length ; i = i + 1) {

                for(var j = 0 ; j < this.reunions[i].membros.length ; j = j +1 ) {
                  for(var k = 0 ; k < this.addMembers.length ; k ++) {
                    
                    if(this.reunions[i].membros[j]._id == this.addMembers[k]._id) {
                      //houve intersecao
                      var data_fim_teste = new Date(x);
                      data_fim_teste.setMinutes(data_fim_teste.getMinutes() + this.time);
                      var data_inicio_existente = new Date(this.reunions[i].data_inicio);
                  
                      var data_fim_existente = new Date(this.reunions[i].data_fim)

                      var condicao = data_fim_teste < data_inicio_existente || x > data_fim_existente;
                      if(!condicao) {
                        
                        colisao = true;
                      }
                    }
                  }
                }
            }
            if(!colisao) {
              this.dates.push(x.toString().split("GMT")[0])
            }
          }
        }
      }
      if(this.dates.length == 0) {
        window.alert("Não há horários disponiveis.")
      } 
      else {
        window.alert("Escolha uma data na lista abaixo.")
      }


    }
  }
    
  switchViewMode() {
    this.viewAll = !this.viewAll;
  }


  userReunionView() {
    this.reunionView = true;
  }

  teamReunionView() {
    this.reunionView = false;
  }
}
