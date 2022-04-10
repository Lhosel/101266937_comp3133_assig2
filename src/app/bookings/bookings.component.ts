import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings?: any;
  username = window.localStorage.getItem("username");

  private VIEW_USER_BOOKINGS = gql`
    query UserBookings($username: String) {
      userBookings(username: $username) {
        id
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.getBookingsByUsername();

    if (this.username == null) {
      this.router.navigate(['login']);
    }
  }

  getBookingsByUsername() {
    this.apollo.watchQuery<any>({
      query: this.VIEW_USER_BOOKINGS,
      variables: {
        username: this.username
      }
    }).valueChanges.subscribe((res) => {
      this.bookings = res.data.userBookings;

      console.log(this.bookings);
    });
  }

}
