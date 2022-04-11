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
  loggedIn?: boolean;

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

    this.getLoggedIn();
    this.reload();
  }

  getLoggedIn() {
    if (localStorage.getItem("username") == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
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

  reload() {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
  }
}
