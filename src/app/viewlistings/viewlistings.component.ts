import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewlistings',
  templateUrl: './viewlistings.component.html',
  styleUrls: ['./viewlistings.component.css']
})
export class ViewlistingsComponent implements OnInit {

  listings: any;

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

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.viewListings().subscribe((res) => {
      this.listings = res.data.viewListings;

      console.log(this.listings);
    });
  }

  viewListings(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: this.VIEW_LISTINGS,
    }).valueChanges;
  }
}
