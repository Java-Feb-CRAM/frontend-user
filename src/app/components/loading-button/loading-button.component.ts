import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
  constructor() {}

  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() text = 'Submit';
  @Input() style: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Output() onClick = new EventEmitter<boolean>();

  clicked(): void {
    this.loading = true;
    this.onClick.emit(true);
  }
}
