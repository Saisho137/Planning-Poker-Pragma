import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringModeItemI } from '../../../interfaces/scoring-mode-interface';
import { CardComponent } from '../../atoms/card/card.component';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ClassroomI } from '../../../interfaces/classroom-interface';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { Subscription } from 'rxjs';

type scoringType = 'fibonacci' | 'oneToFive' | 'oneHundred';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
})
export class CardMenuComponent {
  
  public scoringModeOptions: scoringType[] = ['fibonacci', 'oneToFive', 'oneHundred']
  public scoringSelection: scoringType = 'fibonacci'
  public scoringModeWindow: boolean = false;
  public scoringMode: ScoringModeItemI[] = [];

  private userIdSubscription: Subscription | undefined;
  private userId = '';

  @Input() roomId = ''
  @Input() room: ClassroomI | undefined;

  @Input() selectedCard = '';
  @Input() visualization: 'player' | 'spectator' | '' = '';

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() scoringModeSelection: EventEmitter<scoringType> = new EventEmitter<scoringType>();

  constructor(private classroomService: ClassroomsService, private userService: UsersService) {
    this.assignScoringModeOnInit()
  }

  ngOnInit() {
    this.userIdSubscription = this.userService.userId$.subscribe((userId) => {
      if (userId) this.userId = userId;
      else this.userId = '0000';
    });
  }
  
  assignScoringModeOnInit(): void {
    this.scoringMode = this.classroomService.createScoringMode(this.scoringSelection);
  }

  getScoringMode(value: 'fibonacci' | 'oneToFive' | 'oneHundred'){
    if (this.room?.admin.includes(this.userId)) {
      this.scoringSelection = value;
      this.scoringMode = this.classroomService.createScoringMode(this.scoringSelection);
      this.scoringModeSelection.emit(value)
      this.classroomService.clearSelectedCard(this.roomId, this.userId)
      this.classroomService.clearSelectedCardForMockUpUsers(this.roomId)
      return
    }
    alert('Necesitas ser administrador para cambiar el modo de cartas!')
  }

  switchDisplayModes() {
    this.scoringModeWindow = !this.scoringModeWindow;
  }

  onButtonClick(value: string) {
    this.clickEvent.emit(value);
  }

  ngOnDestroy() {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
