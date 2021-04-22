import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserInfo } from '../../../services/user.service';
import { GuestBookingFormData } from '../guest-booking-form/guest-booking-form.component';

@Component({
  selector: 'app-user-booking-form',
  templateUrl: './user-booking-form.component.html',
  styleUrls: ['./user-booking-form.component.scss'],
})
export class UserBookingFormComponent implements OnChanges {
  @Input() user: UserInfo | undefined;
  userEmail = '';
  userPhone = '';

  @Output()
  userBookingFormSubmitEvent = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.userEmail = this.user.email || '';
      this.userPhone = this.user.phoneNumber || '';
    }
  }

  onSubmit(): void {
    this.userBookingFormSubmitEvent.emit(true);
  }
}
