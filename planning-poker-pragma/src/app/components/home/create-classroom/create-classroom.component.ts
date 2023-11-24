import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVisualizationModeComponent } from './create-visualization-mode/create-visualization-mode.component';

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

  constructor(private router: Router) {}

  validateName(name: string): void {
    const regex = /^[a-zA-Z0-9]{5,20}$/;
    const numeros = name.replace(/[^0-9]/g, '');

    if (!name.match(regex)) {
      window.alert('El nombre debe tener entre 5-20 carácteres.');
      return;
    } else if (numeros.length > 3) {
      window.alert('El nombre debe tener máximo 3 números!');
      return;
    } else if (numeros.length === name.length) {
      window.alert('El nombre no puede estar compuesto únicamente de números!');
      return;
    }
    this.createPary();
  }

  createPary(): void {
    this.nextWindow = true;
  }
}
