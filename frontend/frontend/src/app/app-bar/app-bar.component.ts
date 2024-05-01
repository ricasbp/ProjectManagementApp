import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  @Input() title: String | undefined
  @Input() isAdmin: Boolean | undefined
  open: boolean | undefined
  mobile: boolean | undefined

  constructor(private router: Router) {
    this.open = false;
   }

  ngOnInit(): void {
    console.log(this.isAdmin);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = window.innerWidth < 900;
    console.log(window.screen.width)
  }
  
  closeSideBar(): void{
    this.open = false
  }

  openSideBar(): void{
   this.open = true;
  }

  redirect(str: String){
    this.router.navigate(["/" + str]);
    this.closeSideBar();
  }
  
}

