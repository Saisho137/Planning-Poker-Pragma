import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, GenericInputComponent, GenericButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';

  @Output() sendEmail: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendPassword: EventEmitter<string> = new EventEmitter<string>();
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick() {
    this.clickEvent.emit();
  }
  onInputChange() {
    this.sendEmail.emit(this.email);
    this.sendPassword.emit(this.password);
  }
}
