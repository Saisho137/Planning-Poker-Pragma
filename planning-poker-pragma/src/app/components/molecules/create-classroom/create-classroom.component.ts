import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateVisualizationModeComponent } from '../create-visualization-mode/create-visualization-mode.component';
import { ValidatorService } from '../../../services/validator.service';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateVisualizationModeComponent,
    GenericButtonComponent,
    GenericInputComponent,
  ],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.css',
})
export class CreateClassroomComponent {
  partyName: string = '';

  constructor(private validator: ValidatorService, private router:Router) {}

  validateName(): void {
    this.validator.validateString(this.partyName) ? this.createPary() : null;
  }

  createPary(): void {
    this.router.navigate(['classroom/' + this.partyName]);
  }
}
