import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  private LOGIN_USER = gql`
    query userValidation($username: String, $password: String) {
      userValidation(username: $username, password: $password)
    }
  `

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void { }

  getUserValidation() {
    this.apollo.watchQuery<any>({
      query: this.LOGIN_USER,
      variables: {
        username: this.username,
        password: this.password
      }
    }).valueChanges.subscribe(async (status) => {
      if (status['data'].userValidation == true) {
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          text: 'You have logged in successfully. Hit OK to redirect to home page',
          showConfirmButton: true,
        });

        this.router.navigate(['home']);
      } else {
        await Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'Incorrect username or password. Please try again.',
          showConfirmButton: true,
        });

        this.router.navigate(['login']);
      }
    });
  }
}
