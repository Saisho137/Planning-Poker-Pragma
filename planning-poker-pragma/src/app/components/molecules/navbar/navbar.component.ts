import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericImageComponent } from '../../atoms/generic-image/generic-image.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent, GenericImageComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public username: string = '';

  @Input() buttonText: string = '';
  @Input() tittle: string = '';
  @Input() imgUrl: string = '';
  @Input() roomId: string = '';

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    if (sessionStorage.getItem('user_username')) {
      this.username = sessionStorage
        .getItem('user_username')!
        .substring(0, 2)
        .toUpperCase();
    }
  }

  onButtonClick() {
    this.clickEvent.emit();
  }
}
