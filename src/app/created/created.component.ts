import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.css']
})
export class CreatedComponent implements OnInit {

  listings?: any;

  username = window.localStorage.getItem("username");
  type?: string;

  private VIEW_LISTINGS_BY_USER = gql`
    query UserListings($username: String) {
      userListings(username: $username) {
        id
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        email
        username
      }
    }
  `

  private USER_TYPE = gql`
  query ViewUser($username: String) {
    viewUser(username: $username) {
      type
    }
  }
`

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.getUserType();
    this.getListingByUser();

    if (this.username == null) {
      this.router.navigate(['login']);
    }
  }

  getListingByUser() {
    this.apollo.watchQuery<any>({
      query: this.VIEW_LISTINGS_BY_USER,
      variables: {
        username: this.username
      }
    }).valueChanges.subscribe((res) => {
      this.listings = res.data.userListings;
    })
  }

  getUserType() {
    this.apollo.watchQuery<any>({
      query: this.USER_TYPE,
      variables: {
        username: this.username
      }
    }).valueChanges.subscribe((res) => {
      if (res.data.viewUser[0].type == 'user') {
        this.router.navigate(['home']);
      }
    });
  }
}
