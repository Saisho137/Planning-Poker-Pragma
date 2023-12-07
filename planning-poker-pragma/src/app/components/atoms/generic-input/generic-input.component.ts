import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.css',
})
export class GenericInputComponent {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() string: string = '';
  @Output() message: EventEmitter<string> = new EventEmitter<string>();

  onInputChange() {
    this.message.emit(this.string);
  }
}
