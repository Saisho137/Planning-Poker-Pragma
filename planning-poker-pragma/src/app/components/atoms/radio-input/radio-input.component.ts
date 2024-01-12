import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
})
export class RadioInputComponent {
  @Input() id: string = '';
  @Input() selectedMode: 'player' | 'spectator' | '' = '';
  @Input() condition: 'player' | 'spectator' | '' = '';

  @Output() switchEvent: EventEmitter<void> = new EventEmitter<void>();

  onInputChange() {
    this.switchEvent.emit();
  }
}
