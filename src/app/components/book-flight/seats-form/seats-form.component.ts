import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss'],
})
export class SeatsFormComponent implements OnInit {
  @Input() flightIds: number[] = [];
  @Input() numPassengers = 1;
  flights: Flight[] = [];
  constructor(private readonly flightService: FlightService) {}

  ngOnInit(): void {
    this.flightIds.forEach((id) => {
      this.flightService.getFlight(id).subscribe((f) => {
        this.flights.push(f);
      });
    });
  }
}
