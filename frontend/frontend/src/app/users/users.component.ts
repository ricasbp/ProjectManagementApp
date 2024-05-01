import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-utilizador',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUserAdmin: boolean = false;
  title: string;
  admin: Boolean | undefined = false;
  
  constructor( private userService: UserService,
            private appComponent: AppComponent
  ) {
    this.title = this.appComponent.title;
  } 

  ngOnInit(): void {
    this.getUsers();
    if(this.userService.user)
      this.admin = this.userService.user.admin;
  }

  getUsers(): void {
    this.userService.getUsers()
                    .subscribe(users => this.users = users);
  }


  isAdmin() {
    var element = <HTMLInputElement> document.getElementById("new-user-admin");
    this.newUserAdmin = element.checked;
  }



  registerNewUser(name: string, senha: string) {
    var errors = "";
    if(!this.isAlphaNumeric(name))
      errors += "-> O nome de utilizador só pode ter caracteres alfanuméricos.\n";

    if(name.length < 3)
      errors +="-> O nome de utilizador tem de conter pelo menos 3 caracteres.\n";
    
    if (this.checkIfNameAvailable(name)) {
      errors +="-> O nome de utilizador já existe.\n";
    }

    if(senha.length < 8)
      errors +="-> A senha tem de conter pelo menos 8 caracteres.\n";

    // A senha deve ter oito ou mais caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo;
    if(!this.hasLowerCaseChar(senha))
      errors +="-> A senha tem de conter pelo menos uma letra maiúscula.\n";

    if(!this.hasUpperCaseChar(senha))

      errors +="-> A senha tem de conter pelo menos uma letra minúscul.\n";

    if(!this.hasNumber(senha))
      errors +="-> A senha tem de conter pelo menos um algarismo.\n";
    
    if (errors != "") {
      window.alert(errors);
    } else {
      var admin = this.newUserAdmin;
      this.userService.addUser({ name, senha, admin } as User)
                      .subscribe(user => {
                                  console.log(user);
                                  this.users.push(user);
                                  this.getUsers();
                                });
      window.alert("Utilizador registado com sucesso!");
    }
  }

  checkIfNameAvailable(name:string) {
    var ret = false;
    this.users.forEach(user => {
          if (user.name == name) {
              ret = true;
          }
    });
    return ret;
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

  hasUpperCaseChar(s:string) {
    return /[A-Z]/.test(s);
  }

  hasLowerCaseChar(s:string){
    return /[a-z]/.test(s);
  }

  hasNumber(s:string) {
    return /\d/.test(s);
}
}
