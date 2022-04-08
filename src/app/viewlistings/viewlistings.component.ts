import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewlistings',
  templateUrl: './viewlistings.component.html',
  styleUrls: ['./viewlistings.component.css']
})
export class ViewlistingsComponent implements OnInit {

  listings: any;
  selected?: any;

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
      this.listings = res.data.viewListings;
    });
  }

  viewListings(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: this.VIEW_LISTINGS,
    }).valueChanges;
  }

  book(listing: any) {
    this.selected = listing;

    this.router.navigate(['book', this.selected.id]);
  }
}
