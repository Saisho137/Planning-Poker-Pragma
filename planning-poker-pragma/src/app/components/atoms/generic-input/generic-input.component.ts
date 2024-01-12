import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss',
})
export class GenericInputComponent {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() contentText: string = '';
  @Input() required: boolean = true;
  @Input() readOnly: boolean = false;

  @Output() InputChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange() {
    this.InputChange.emit(this.contentText);
  }
}
