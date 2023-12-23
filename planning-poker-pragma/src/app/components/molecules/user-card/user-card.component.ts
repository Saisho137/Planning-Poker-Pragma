import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() cardValue: string = '';
  @Input() selectedCard: string = '';
  @Input() visualization: string = '';
  @Input() votationFinished: boolean = false;
  defaultUser: string = '';

  ngOnInit() {
    if (this.cardValue) {
      this.defaultUser = this.cardValue.substring(0, 2).toUpperCase();
    }
  }
}
