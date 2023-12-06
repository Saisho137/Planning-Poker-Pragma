import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateVisualizationModeComponent } from '../create-visualization-mode/create-visualization-mode.component';
import { ValidatorService } from '../../../services/validator.service';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateVisualizationModeComponent],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.css',
})
export class CreateClassroomComponent {
  partyName: string = '';
  nextWindow: boolean = false;

  constructor(private validator: ValidatorService) {}

  validateName(name: string): void {
    this.validator.validateString(name) ? this.createPary() : null;
  }

  createPary(): void {
    this.nextWindow = true;
  }
}