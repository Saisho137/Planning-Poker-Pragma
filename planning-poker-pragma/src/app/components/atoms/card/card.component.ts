import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-atom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public isSelected = false;

  @Input() cardValue = '';
  @Input() selectedCard = '';
  @Input() mode: 'pool' | 'average' = 'pool';
  @Input() votes = '99 votos';

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }

  onCardClick() {
    this.clickEvent.emit();
  }
}
