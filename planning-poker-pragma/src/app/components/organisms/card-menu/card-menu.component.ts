import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringModeInterface } from '../../../interfaces/scoring-mode-interface';
import { CardComponent } from '../../atoms/card/card.component';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
})
export class CardMenuComponent {
  @Input() visualization: 'player' | 'spectator' | '' = '';
  @Input() selectedCard: string = '';
  @Input() scoringMode: ScoringModeInterface[] = [];
  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  onButtonClick(value: string) {
    this.clickEvent.emit(value);
  }
}
