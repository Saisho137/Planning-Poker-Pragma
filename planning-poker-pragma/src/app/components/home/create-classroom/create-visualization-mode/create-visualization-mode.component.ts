import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../../services/validator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-visualization-mode',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-visualization-mode.component.html',
  styleUrl: './create-visualization-mode.component.css',
})
export class CreateVisualizationModeComponent {
  @Input() classroomId: string = '';

  username: string =
    sessionStorage.getItem('user_username') !== null
      ? sessionStorage.getItem('user_username')!
      : '';

  selectedMode: string = '';

  constructor(private router: Router, private validator: ValidatorService) {}

  switchCheckbox(checkbox: string): void {
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
      this.selectedMode.length > 0
        ? this.router.navigate(['classroom/' + this.classroomId])
        : window.alert('Debes seleccionar un modo de visualización!');
    }
  }
}
