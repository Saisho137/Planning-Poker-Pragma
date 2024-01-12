import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { nameValidator } from '../../../shared/validators';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';
import { UserInRoomInterface } from '../../../interfaces/user-in-room-interface';
import { RadioButtonsMenuComponent } from './radio-buttons-menu/radio-buttons-menu.component';

@Component({
  selector: 'app-create-visualization-mode',
  standalone: true,
  imports: [
    CommonModule,
    GenericButtonComponent,
    GenericInputComponent,
    RadioButtonsMenuComponent,
  ],
  templateUrl: './create-visualization-mode.component.html',
  styleUrl: './create-visualization-mode.component.scss',
})
export class CreateVisualizationModeComponent {
  public username: string;
  public selectedMode: 'player' | 'spectator' | '' = '';

  @Input() classroomId: string = '';

  @Output() roomGeneratedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private classroomService: ClassroomsService) {
    this.username = sessionStorage.getItem('user_username')!;
  }

  switchRadio(radio: 'player' | 'spectator'): void {
    this.selectedMode = radio;
  }

  continueToRoom(): void {
    if (nameValidator(this.username)) {
      if (this.username !== sessionStorage.getItem('user_username')!)
        sessionStorage.setItem('user_username', this.username);
      if (!this.selectedMode) this.selectedMode = 'player';

      const user: UserInRoomInterface = {
        id: sessionStorage.getItem('user_id')!,
        username: sessionStorage.getItem('user_username')!,
        rol: this.selectedMode,
        cardSelected: '',
      };

      this.classroomService.createRoom(this.classroomId, user);
      this.roomGeneratedEvent.emit();
    }
  }
}
