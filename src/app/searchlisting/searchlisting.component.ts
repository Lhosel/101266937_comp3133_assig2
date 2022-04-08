import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-searchlisting',
  templateUrl: './searchlisting.component.html',
  styleUrls: ['./searchlisting.component.css']
})
export class SearchlistingComponent implements OnInit {

  listings: any = '';
  selected?: any;

  searchString!: string;
  searchType: string = 'name';
  loggedIn?: boolean;

  private SEARCH_LISTING_BY_NAME = gql`
    query SearchListingByName($listingTitle: String) {
      searchListingByName(listing_title: $listingTitle) {
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

  private SEARCH_LISTING_BY_CITY = gql`
    query SearchListingByCity($city: String) {
      searchListingByCity(city: $city) {
        id
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        username
      }
    }
  `

  private SEARCH_LISTING_BY_POSTAL = gql`
    query SearchListingByPostal($postalCode: String) {
      searchListingByPostal(postal_code: $postalCode) {
        id
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        username
      }
    }
  `

  constructor(private apollo: Apollo, private router: Router) { }

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

  getListingByName() {
    this.apollo.watchQuery<any>({
      query: this.SEARCH_LISTING_BY_NAME,
      variables: {
        listingTitle: this.searchString
      }
    }).valueChanges.subscribe((res) => {
      this.listings = res.data.searchListingByName;
    })
  }

  getListingByCity() {
    this.apollo.watchQuery<any>({
      query: this.SEARCH_LISTING_BY_CITY,
      variables: {
        city: this.searchString
      }
    }).valueChanges.subscribe((res) => {
      this.listings = res.data.searchListingByCity;
    })
  }

  getListingByPostal() {
    this.apollo.watchQuery<any>({
      query: this.SEARCH_LISTING_BY_POSTAL,
      variables: {
        postalCode: this.searchString
      }
    }).valueChanges.subscribe((res) => {
      this.listings = res.data.searchListingByPostal;
    })
  }

  setSearchType(type: string) {
    this.searchType = type;
  }

  book(listing: any) {
    this.selected = listing;

    console.log(this.selected);

    this.router.navigate(['book', this.selected.id]);
  }
}