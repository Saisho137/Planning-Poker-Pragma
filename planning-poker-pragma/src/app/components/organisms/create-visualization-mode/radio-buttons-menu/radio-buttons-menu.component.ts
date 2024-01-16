import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from '../../../atoms/radio-button/radio-button.component';

@Component({
  selector: 'radio-buttons-menu',
  standalone: true,
  imports: [CommonModule, RadioButtonComponent],
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
