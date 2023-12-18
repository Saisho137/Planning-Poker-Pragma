import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.css'
})
export class CheckboxInputComponent {
  @Input() id: string = '';
  @Input() selectedMode: 'player' | 'spectator' | '' = '';
  @Input() condition: 'player' | 'spectator' | '' = '';
  @Output() switchEvent: EventEmitter<void> = new EventEmitter<void>();

  onInputChange() {
    this.switchEvent.emit();
  }

}
