import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateVisualizationModeComponent } from '../../../components/templates/create-visualization-mode/create-visualization-mode.component';
import { GenericButtonComponent } from '../../../components/atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../../components/atoms/generic-input/generic-input.component';

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
  styleUrl: './create-classroom.component.scss',
})
export class CreateClassroomComponent {
  
}
