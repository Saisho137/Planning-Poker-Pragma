import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public isSelected: boolean = false;

  @Input() cardValue: string = '';
  @Input() selectedCard: string = '';
  @Input() mode: 'pool' | 'average' = 'pool';
  @Input() votes: string = '99 votos';

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }

  onCardClick() {
    this.clickEvent.emit();
  }
}
