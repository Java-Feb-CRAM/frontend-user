import { Component, OnInit } from '@angular/core';
import { Airport } from 'src/app/models/Airport';
import { AirportService } from 'src/app/services/airport.service';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit {
  airports: Airport[] = [];

  constructor(
    private flightService: FlightService,
    private airportService: AirportService) { }

  ngOnInit(): void { 
    this.airportService.getAllAirports().subscribe((airports) => {
      this.airports = airports;
    })
  }
/*
  getAllFlightsWithDepartureAirportInRoute(iataId: string): Flight[]
  {
    return
  }
*/
}
