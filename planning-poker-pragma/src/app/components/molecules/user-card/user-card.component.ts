import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  public defaultUser: string = '';

  @Input() cardValue: string = '';
  @Input() selectedCard: string = '';
  @Input() visualization: string = '';
  @Input() votationFinished: boolean = false;

  ngOnInit() {
    if (this.cardValue) {
      this.defaultUser = this.cardValue.substring(0, 2).toUpperCase();
    }
  }
}
