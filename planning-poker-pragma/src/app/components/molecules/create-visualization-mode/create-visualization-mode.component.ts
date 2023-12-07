import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../services/validator.service';
import { FormsModule } from '@angular/forms';
import { ClassroomsService } from '../../../services/classrooms.service';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-create-visualization-mode',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GenericButtonComponent,
    GenericInputComponent,
    CheckboxInputComponent,
  ],
  templateUrl: './create-visualization-mode.component.html',
  styleUrl: './create-visualization-mode.component.css',
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
    private router: Router,
    private validator: ValidatorService,
    private classrooms: ClassroomsService
  ) {}

  switchCheckbox(checkbox: 'player' | 'spectator'): void {
    if (
      (this.selectedMode === 'player' && checkbox === 'player') ||
      (this.selectedMode === 'spectator' && checkbox === 'spectator')
    ) {
      this.selectedMode = '';
      return;
    }
    this.selectedMode = checkbox;
  }
  continueToRoom(): void {
    if (this.validator.validateString(this.username)) {
      sessionStorage.setItem('user_username', this.username);
      if (this.selectedMode.length > 0) {
        this.classrooms.createRoom(
          this.classroomId,
          sessionStorage.getItem('user_id')!,
          sessionStorage.getItem('user_username')!,
          this.selectedMode
        );
        this.roomGeneratedEvent.emit();
      } else {
        window.alert('Debes seleccionar un modo de visualización!');
      }
    }
  }
}
