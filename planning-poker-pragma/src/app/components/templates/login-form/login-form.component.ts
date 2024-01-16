import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public email: string = '';
  public password: string = '';

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
