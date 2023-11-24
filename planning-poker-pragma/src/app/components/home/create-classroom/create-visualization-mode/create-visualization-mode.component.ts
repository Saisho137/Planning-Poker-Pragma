import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../../../interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-visualization-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-visualization-mode.component.html',
  styleUrl: './create-visualization-mode.component.css',
})
export class CreateVisualizationModeComponent {
  @Input() classroomId: string = '';

  userJson: UserInterface =
    localStorage.getItem('user_object') !== null
      ? JSON.parse(localStorage.getItem('user_object')!)
      : {};

  username: string =
    this.userJson.username !== null ? this.userJson.username : '';

  selectedMode: string = '';

  constructor(private router: Router) {}

  switchCheckbox(checkbox: string): void {
    if (
      (this.selectedMode === 'player' && checkbox === 'player') || (this.selectedMode === 'spectator' && checkbox === 'spectator')
    ) {
      this.selectedMode = '';
      return;
    }
    this.selectedMode = checkbox;
  }
  continueToRoom(): void {
    this.selectedMode.length > 0
      ? this.router.navigate(['classroom/' + this.classroomId])
      : window.alert('Debes seleccionar un modo de visualización!');
  }
}
