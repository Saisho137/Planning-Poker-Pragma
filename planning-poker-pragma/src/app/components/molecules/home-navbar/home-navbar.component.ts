import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css',
})
export class HomeNavbarComponent {
  @Input() buttonText: string = '';
  @Input() tittle: string = '';
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick() {
    this.clickEvent.emit();
  }
}
