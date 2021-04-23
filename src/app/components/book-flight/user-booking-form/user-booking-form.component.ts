import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserInfo } from '../../../services/user.service';

@Component({
  selector: 'app-user-booking-form',
  templateUrl: './user-booking-form.component.html',
  styleUrls: ['./user-booking-form.component.scss'],
})
export class UserBookingFormComponent implements OnChanges, OnInit {
  @Input() user: UserInfo | undefined;
  userEmail = '';
  userPhone = '';

  @Output()
  userBookingFormSubmitEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.updateUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUser();
  }

  private updateUser(): void {
    if (this.user) {
      this.userEmail = this.user.email || '';
      this.userPhone = this.user.phoneNumber || '';
    }
  }

  onSubmit(): void {
    this.userBookingFormSubmitEvent.emit(true);
  }
}
