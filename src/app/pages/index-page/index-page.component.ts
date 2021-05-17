import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/Flight';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  constructor(private readonly flightService: FlightService) {}
  flight: Flight | undefined;
  ngOnInit(): void {
    this.flightService.getFlight(9).subscribe((f) => {
      console.log(f);
      this.flight = f;
    });
  }
}
