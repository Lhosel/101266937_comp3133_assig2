import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.css']
})
export class CreatedComponent implements OnInit {

  listings?: any;

  username = window.localStorage.getItem("username");

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

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getListingByUser();
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
}
