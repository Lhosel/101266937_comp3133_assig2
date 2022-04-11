import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: any;
  loggedIn?: boolean;
  type?: string;
  username = window.localStorage.getItem("username");

  private VIEW_USER = gql`
  query ViewUser($username: String) {
    viewUser(username: $username) {
      type
    }
  }
`

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.getLoggedIn();
    this.getUserType();
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

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successful',
      text: 'Logged out successfully.',
      showConfirmButton: true,
    });

    this.router.navigate(['home']);
  }

  getUserType() {
    this.apollo.watchQuery<any>({
      query: this.VIEW_USER,
      variables: {
        username: this.username
      }
    }).valueChanges.subscribe((res) => {
      this.user = res.data.viewUser[0].type;
      this.type = this.user;
    });
  }
}
