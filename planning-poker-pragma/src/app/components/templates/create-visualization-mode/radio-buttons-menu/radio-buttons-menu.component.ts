import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioInputComponent } from '../../../atoms/radio-input/radio-input.component';

@Component({
  selector: 'app-radio-buttons-menu',
  standalone: true,
  imports: [CommonModule, RadioInputComponent],
  templateUrl: './radio-buttons-menu.component.html',
  styleUrl: './radio-buttons-menu.component.scss',
})
export class RadioButtonsMenuComponent {
  public selectedMode: 'player' | 'spectator' | '' = '';
  
  @Output() changeEvent: EventEmitter<'player' | 'spectator'> =
    new EventEmitter<'player' | 'spectator'>();

  switchRadio(radio: 'player' | 'spectator'): void {
    this.selectedMode = radio;
    this.changeEvent.emit(this.selectedMode);
  }
}
