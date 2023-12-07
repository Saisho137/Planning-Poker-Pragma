import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css',
})
export class GenericButtonComponent {
  @Input() buttonText: string = '';
  @Input() disabledState: boolean = false;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick() {
    this.clickEvent.emit();
  }
}