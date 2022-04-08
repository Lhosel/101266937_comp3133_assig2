import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {

  listing?: any;
  bookings?: any;
  id!: string;

  booking_start!: string;
  booking_end!: string;

  username = window.localStorage.getItem("username");

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

  private VIEW_BOOKINGS = gql`
    query ViewBookings {
      viewBookings {
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

  private ADD_BOOKING = gql`
    mutation AddBooking(
      $listingId: String!
      $bookingId: String!
      $bookingDate: String!
      $bookingStart: String!
      $bookingEnd: String!
      $username: String!
    ) {
      addBooking(
        listing_id: $listingId
        booking_id: $bookingId
        booking_date: $bookingDate
        booking_start: $bookingStart
        booking_end: $bookingEnd
        username: $username
      ) {
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

  constructor(private apollo: Apollo, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((values) => {
      this.id = values['id'];
      this.getListingById();;
    });

    this.viewBookings().subscribe((res) => {
      this.bookings = res.data.viewBookings.length + 1;
    });
  }

  getListingById() {
    this.apollo.watchQuery<any>({
      query: this.GET_LISTING_BY_ID,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe((res) => {
      this.listing = res.data.searchListingById[0];
    });
  }

  viewBookings(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: this.VIEW_BOOKINGS,
    }).valueChanges;
  }

  addBooking() {
    var bookingDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    this.apollo.mutate({
      mutation: this.ADD_BOOKING,
      variables: {
        listingId: this.listing.listing_id,
        bookingId: 'B' + this.bookings,
        bookingDate: bookingDate,
        bookingStart: this.booking_start.toString(),
        bookingEnd: this.booking_end.toString(),
        username: this.username
      }
    }).subscribe(async (res) => {
      console.log(res['data']);

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfull',
        text: 'Booking was added. Hit OK to redirect to listings.',
        showConfirmButton: true,
      });

      this.router.navigate(['listings']);
    });
  }
}
