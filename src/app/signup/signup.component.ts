import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
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

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void { }

  addUser() {
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
      console.log(res['data']);

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully Signed Up',
        showConfirmButton: true,
      });

      this.router.navigate(['home']);
    });
  }
}
