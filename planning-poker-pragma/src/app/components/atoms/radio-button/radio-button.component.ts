import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'radio-atom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent {
  @Input() id: string = '';
  @Input() selectedMode: 'player' | 'spectator' | '' = '';
  @Input() condition: 'player' | 'spectator' | '' = '';

  @Output() switchEvent: EventEmitter<void> = new EventEmitter<void>();

  onInputChange() {
    this.switchEvent.emit();
  }
}
