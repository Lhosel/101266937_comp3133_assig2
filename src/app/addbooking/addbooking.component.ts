import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {

  listing?: any;

  private GET_LISTING_BY_ID = gql`
    query SearchListingById($id: String) {
      searchListingById(_id: $id) {
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

  constructor(private apollo: Apollo, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(values => {
      this.getListingById(values['id']);

      console.log();
    })
  }

  getListingById(id: String) {
    this.apollo.watchQuery<any>({
      query: this.GET_LISTING_BY_ID,
      variables: {
        id
      }
    }).valueChanges.subscribe((res) => {
      this.listing = res.data.searchListingById;

      console.log(this.listing);
    })
  }

}
