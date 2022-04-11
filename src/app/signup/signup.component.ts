import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username!: string;
  password!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  type: string = 'user';

  users: any;

  // validation format
  emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passValid = /^[a-zA-Z0-9#$&_]+$/;

  // error messages
  usernameError?: string;
  passwordLenError?: string;
  passwordError?: string;
  emailError?: string;


  private ADD_USER = gql`
    mutation AddUser(
      $username: String!
      $firstname: String!
      $lastname: String!
      $password: String!
      $email: String!
      $type: String!
    ) {
      addUser(
        username: $username
        firstname: $firstname
        lastname: $lastname
        password: $password
        email: $email
        type: $type
      ) {
        id
        username
        firstname
        lastname
        password
        email
        type
      }
    }
  `

  private LIST_USERS = gql`
    query ListUsers {
      listUsers {
        username
      }
    }
  `

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.checkUsername();
  }

  addUser() {
    do {
      for (var i = 0; i < this.users.length; i++) {
        if (this.username == this.users[i].username) {
          this.usernameError = 'username already exists';
        }
      }
      i++;
    } while (i == 0);

    if (this.password.length < 6) {
      this.passwordLenError = 'password length is less than 6';
    } else {
      this.passwordLenError = '';
    }

    if (!this.passValid.test(this.password)) {
      this.passwordError = 'password is not valid';
    } else {
      this.passwordError = '';
    }

    if (!this.emailValid.test(this.email)) {
      this.emailError = 'email is not valid';
    } else {
      this.emailError = '';
    }

    this.apollo.mutate({
      mutation: this.ADD_USER,
      variables: {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        type: this.type
      }
    }).subscribe(async (res) => {
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success',
        text: 'User signed up. Hit OK to go to home page.',
        showConfirmButton: true,
      });

      this.router.navigate(['home']);
    });
  }

  checkUsername() {
    this.apollo.watchQuery<any>({
      query: this.LIST_USERS
    }).valueChanges.subscribe((res) => {
      this.users = res.data.listUsers;
    });
  }
}
