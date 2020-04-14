import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user : any

  constructor(private route: Router) { }

  ngOnInit() {
    localStorage.removeItem('user')
  }

  goTologin(user) {
    this.user = user;
    this.route.navigate(['Login'])
    localStorage.setItem('user', user)
  }

}
