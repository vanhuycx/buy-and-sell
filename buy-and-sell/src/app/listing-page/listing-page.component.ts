import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

//RxJs & HttpClient

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingService: ListingsService) {}

  ngOnInit(): void {
    this.listingService
      .getListings()
      .subscribe((listings) => (this.listings = listings));
  }
}
