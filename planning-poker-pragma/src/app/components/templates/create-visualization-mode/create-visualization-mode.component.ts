import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../../services/validator.service';
import { ClassroomsService } from '../../../services/classrooms.service';
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
  @Input() classroomId: string = '';
  @Output() roomGeneratedEvent: EventEmitter<void> = new EventEmitter<void>();

  username: string =
    sessionStorage.getItem('user_username') !== null
      ? sessionStorage.getItem('user_username')!
      : '';

  selectedMode: 'player' | 'spectator' | '' = '';

  constructor(
    private validator: ValidatorService,
    private classrooms: ClassroomsService
  ) {}

  switchRadio(radio: 'player' | 'spectator'): void {
    this.selectedMode = radio;
  }

  continueToRoom(): void {
    if (this.validator.validateString(this.username)) {
      sessionStorage.setItem('user_username', this.username);
      if (this.selectedMode.length > 0) {
        if (this.selectedMode === '') this.selectedMode = 'player';

        const user: UserInRoomInterface = {
          id: sessionStorage.getItem('user_id')!,
          username: sessionStorage.getItem('user_username')!,
          rol: this.selectedMode,
          cardSelected: '',
        };

        this.classrooms.createRoom(this.classroomId, user);
        this.roomGeneratedEvent.emit();
      } else {
        window.alert('Debes seleccionar un modo de visualización!');
      }
    }
  }
}
