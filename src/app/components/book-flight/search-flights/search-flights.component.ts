import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss'],
})
export class SearchFlightsComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        this.flights = flights;
      },
    });
  }
}
