import { Component, Input, OnInit } from '@angular/core';
import { UpdatePassengerDto } from '../../dto/UpdatePassengerDto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-booking-form',
  templateUrl: './edit-booking-form.component.html',
  styleUrls: ['./edit-booking-form.component.scss'],
})
export class EditBookingFormComponent implements OnInit {
  @Input() originalPassengers: UpdatePassengerDto[] = [];
  passengersForm: FormGroup;
  today: any;
  constructor(
    public activeModal: NgbActiveModal,
    private readonly fb: FormBuilder
  ) {
    this.passengersForm = this.fb.group({
      passengers: this.fb.array([]),
    });

    const date = new Date();
    this.today = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  ngOnInit(): void {
    this.originalPassengers.forEach((originalPassenger) => {
      this.addPassenger(
        originalPassenger.id.toString(),
        originalPassenger.givenName,
        originalPassenger.familyName,
        originalPassenger.address,
        originalPassenger.gender,
        new Date(originalPassenger.dob)
      );
    });
  }

  get passengers(): FormArray {
    return this.passengersForm.get('passengers') as FormArray;
  }

  newPassenger(
    id: string,
    givenName: string,
    familyName: string,
    address: string,
    gender: string,
    dob: Date
  ): FormGroup {
    return this.fb.group({
      dob: [dob, [Validators.required]],
      givenName: [givenName, [Validators.required]],
      familyName: [familyName, [Validators.required]],
      gender: [
        gender,
        [Validators.required, Validators.pattern(/Male|Female|Other/)],
      ],
      address: [address, [Validators.required]],
      id: [id, [Validators.required]],
    });
  }

  addPassenger(
    id: string,
    givenName: string,
    familyName: string,
    address: string,
    gender: string,
    dob: Date
  ): void {
    dob.setDate(dob.getDate() + 1);
    this.passengers.push(
      this.newPassenger(id, givenName, familyName, address, gender, dob)
    );
  }

  onSubmit(): void {
    const passengers = this.passengersForm.controls.passengers.value;
    const dto = { passengers: {} };
    passengers.forEach((passenger: any) => {
      const newDob: Date = passenger.dob;
      newDob.setDate(newDob.getDate() - 1);
      // @ts-ignore
      dto.passengers[passenger.id.toString()] = {
        givenName: passenger.givenName,
        familyName: passenger.familyName,
        dob: newDob.toISOString().split('T')[0],
        gender: passenger.gender,
        address: passenger.address,
      };
    });
    this.activeModal.close(dto);
  }
}
