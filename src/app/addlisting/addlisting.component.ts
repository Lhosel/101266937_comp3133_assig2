import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.css']
})
export class AddlistingComponent implements OnInit {

  listings?: any;

  listingTitle!: string;
  description!: string;
  street!: string;
  city!: string;
  postalCode!: string;
  price!: number
  email!: string;

  username = window.localStorage.getItem("username");

  private ADD_LISTING = gql`
    mutation AddListing(
      $listingId: String!
      $listingTitle: String!
      $description: String!
      $street: String!
      $city: String!
      $postalCode: String!
      $price: Float!
      $email: String!
      $username: String!
    ) {
      addListing(
        listing_id: $listingId
        listing_title: $listingTitle
        description: $description
        street: $street
        city: $city
        postal_code: $postalCode
        price: $price
        email: $email
        username: $username
      ) {
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

  private VIEW_LISTINGS = gql`
    query ViewListings {
      viewListings {
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

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.viewListings().subscribe((res) => {
      this.listings = res.data.viewListings.length + 1;
    });
  }

  addListing() {
    this.apollo.mutate({
      mutation: this.ADD_LISTING,
      variables: {
        listingId: 'L' + this.listings,
        listingTitle: this.listingTitle,
        description: this.description,
        street: this.street,
        city: this.city,
        postalCode: this.postalCode,
        price: this.price,
        email: this.email,
        username: this.username
      }
    }).subscribe(async (res) => {
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfull',
        text: 'Listing was added. Hit OK to redirect to listings.',
        showConfirmButton: true,
      });

      this.router.navigate(['listings']);
    });
  }

  viewListings(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: this.VIEW_LISTINGS,
    }).valueChanges;
  }
}
