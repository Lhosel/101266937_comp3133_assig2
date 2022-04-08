import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLoggedIn();
  }

  getLoggedIn() {
    if (localStorage.getItem("username") == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem("username");
    this.getLoggedIn();

    this.router.navigate(['home']);
  }
}
