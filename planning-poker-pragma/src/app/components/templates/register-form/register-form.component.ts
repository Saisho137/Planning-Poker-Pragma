import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  public email: string = '';
  public password: string = '';
  public username: string = '';

  @Output() sendEmail: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendPassword: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendUsername: EventEmitter<string> = new EventEmitter<string>();
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick() {
    this.clickEvent.emit();
  }
  
  onInputChange() {
    this.sendEmail.emit(this.email);
    this.sendPassword.emit(this.password);
    this.sendUsername.emit(this.username);
  }
}
