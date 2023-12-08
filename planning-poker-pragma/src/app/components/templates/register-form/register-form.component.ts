import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent, GenericInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  email: string = '';
  password: string = '';
  username: string = '';

  @Output() sendEmail: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendPassword: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendUsername: EventEmitter<string> = new EventEmitter<string>();
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick() {
    this.clickEvent.emit()
  }
  onInputChange(){
    this.sendEmail.emit(this.email);
    this.sendPassword.emit(this.password);
    this.sendUsername.emit(this.username);
  }
}
