import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'input-atom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type = 'text';
  @Input() id = '';
  @Input() contentText = '';
  @Input() required = true;
  @Input() readOnly = false;

  @Output() InputChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange() {
    this.InputChange.emit(this.contentText);
  }
}
