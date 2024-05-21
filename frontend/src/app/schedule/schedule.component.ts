import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Period } from '../period';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  user: User | undefined;
  periods: Period[] = [];
  periodAdd: Period | undefined;
  title: String;
  
  constructor(
    private userService: UserService,
    private appComponent: AppComponent
  ) { 
    this.title = this.appComponent.title;
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.getPeriods();
  }

  getPeriods(): void {
    if (this.user) {
      this.userService.getPeriods(this.user._id)
      .subscribe(periods => this.periods = periods);
    }
  }

  addPeriod(date: string, begin: string, end: string): void { 
    var error = "";
    var beginDate = new Date(date);
    var endDate = new Date(date);

    beginDate.setHours(Number(begin.split(":")[0]));
    endDate.setHours(Number(end.split(":")[0]));
    beginDate.setMinutes(Number(begin.split(":")[1]));
    endDate.setMinutes(Number(end.split(":")[1]));

    if (!date) {
      error = "Por favor preencha a data de indisponibilidade.\n";
    }

    if (!begin || !end ) {
      error += "Por favor preencha os horários de indisponibilidade.\n"
    }

    if (new Date().getTime() > beginDate.getTime()) {
      error += "A data inserida tem de ser posterior à data atual.\n";
    }

    if (beginDate.getTime() > endDate.getTime()) {
      error += "O horário final tem de ser posterior ao horário inicial.";
    }
    
    if (error != "") {
      window.alert(error);
    } else {
      this.userService.createPeriod(beginDate.toLocaleString(), endDate.toLocaleString())
        .subscribe(period => {
          this.userService.addPeriod(period, this.user?._id as string)
          .subscribe(_ => this.getPeriods());
        });
      window.alert("Horário de indisponibilidade guardado com sucesso.");
    }
  }
}
