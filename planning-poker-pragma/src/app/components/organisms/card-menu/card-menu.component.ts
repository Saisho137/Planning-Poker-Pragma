import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringModeItemI } from '../../../interfaces/scoring-mode-interface';
import { CardComponent } from '../../atoms/card/card.component';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
})
export class CardMenuComponent {
  public scoringModeOptions: ('fibonacci' | 'oneToFive' | 'oneHundred')[] = ['fibonacci', 'oneToFive', 'oneHundred']
  public scoringModeWindow: boolean = false;
  public scoringMode: ScoringModeItemI[] = [];

  @Input() selectedCard: string = '';
  @Input() visualization: 'player' | 'spectator' | '' = '';

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() scoringModeSelection: EventEmitter<'fibonacci' | 'oneToFive' | 'oneHundred'> = new EventEmitter<'fibonacci' | 'oneToFive' | 'oneHundred'>();

  constructor(private classroomService: ClassroomsService) {
    this.scoringMode = this.classroomService.createScoringMode('fibonacci');
  }
  
  getScoringMode(value: 'fibonacci' | 'oneToFive' | 'oneHundred'){
    this.scoringMode = this.classroomService.createScoringMode(value);
    this.scoringModeSelection.emit(value)
  }

  switchDisplayModes() {
    this.scoringModeWindow = !this.scoringModeWindow;
  }

  onButtonClick(value: string) {
    this.clickEvent.emit(value);
  }
}
