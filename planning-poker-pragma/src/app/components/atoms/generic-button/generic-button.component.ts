import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss',
})
export class GenericButtonComponent {
  @Input() buttonText: string = '';
  @Input() type: 'variation' | 'invitation' | '' = '';
  @Input() isSubmitType: boolean = false;
  @Input() disabledState: boolean = false;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick() {
    this.clickEvent.emit();
  }
}
