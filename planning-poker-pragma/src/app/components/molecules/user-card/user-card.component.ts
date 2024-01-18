import { Component, Input, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardValue']) {
      const newCardValue = changes['cardValue'].currentValue;
      this.defaultUser = newCardValue.substring(0, 2).toUpperCase();
    }
  }
}
