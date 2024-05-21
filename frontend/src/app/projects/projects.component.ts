import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  title: string;
  admin: Boolean | undefined = false;

  constructor(private projectService: ProjectService,
    private userService: UserService,
    private appComponent: AppComponent) {
      this.title = this.appComponent.title;
     }

  ngOnInit(): void {
    //console.log("aaa entrou");
    this.getProjects();
    if(this.userService.user != undefined) {
      this.admin = this.userService.user.admin;
    }
    //console.log(this.admin)
    
  }


  getProjects(): void {
    this.projectService.getProjects()
    .subscribe(projects => this.projects = projects);
  }

  add(nome: string, acronimo: string, date_inicio: string, date_fim: string): void {
    
    var data_fim = new Date(date_fim)
    var data_inicio = new Date(date_inicio)


    var isAlphaNumeric = this.isAlphaNumeric(nome)
    
    var lista_acronimos = [acronimo]
    for (let x of this.projects) {
      lista_acronimos.push(x.acronimo);
    }

    //console.log("data");
    //console.log(data_inicio)
    if(!isAlphaNumeric) {
      window.alert("O projeto deve ter um nome que só pode ter caracteres alfanuméricos.");
    }
    else if(nome.length < 4) {
      window.alert("O projeto deve ter um nome que deve ter quatro caracteres no mínimo.");
    }
    else if(acronimo.length != 3) {
      window.alert("O projeto deve ter um acrónimo com exatamente três caracteres alfanuméricos.");
    }
    else if (this.hasDuplicates(lista_acronimos)){
      window.alert("O projeto deve ter um acrónimo que tem de ser único.");
    }
    else if (!data_inicio.getTime()) {
      window.alert("Data de inicio deve ser preenchida.")
    }
    else if (data_fim.getTime() && (data_fim < data_inicio)) {
        window.alert("O projeto deve ter uma data de início (que terá de ser igual ou posterior à data atual) e pode ter uma data de fim (que terá de ser posterior à data de início).");
    }  
    else {
      if(data_fim.getTime()) {
            this.projectService.addProject({ nome, acronimo, data_inicio, data_fim } as Project)
          .subscribe(hero => {
            this.projects.push(hero);
            this.getProjects();
          });
      }
      else {
            this.projectService.addProject({ nome, acronimo, data_inicio} as Project)
            .subscribe(hero => {
              this.projects.push(hero);
              this.getProjects();
            });
      }
      
      
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

  hasDuplicates(array : String[]) {
    return (new Set(array)).size !== array.length;
}

 

}
