import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { nameValidator } from '../../../shared/validators/regex.validator';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { RadioButtonsMenuComponent } from './radio-buttons-menu/radio-buttons-menu.component';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-visualization-mode',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    RadioButtonsMenuComponent,
  ],
  templateUrl: './create-visualization-mode.component.html',
  styleUrl: './create-visualization-mode.component.scss',
})
export class CreateVisualizationModeComponent {
  public userId: string = '';
  public username: string = '';
  public initialUsername: string = '';
  public selectedMode: 'player' | 'spectator' | '' = '';

  private userIdSubscription: Subscription | undefined;
  private usernameSubscription: Subscription | undefined;

  @Input() classroomId: string = '';

  @Output() roomGeneratedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private classroomService: ClassroomsService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.userIdSubscription = this.userService.userId$.subscribe((userId) => {
      if (userId) this.userId = userId;
      else this.userId = '0000';
    });
    this.usernameSubscription = this.userService.username$.subscribe(
      (username) => {
        if (username) this.username = username;
        else this.username = 'ERR';
      }
    );
    this.initialUsername = this.username;
  }

  switchRadio(radio: 'player' | 'spectator'): void {
    this.selectedMode = radio;
  }

  continueToRoom(): void {
    if (nameValidator(this.username)) {
      if (this.username !== this.initialUsername) {
        this.userService.setUsername(this.username);
        sessionStorage.setItem('user_username', this.username);
      }
      if (!this.selectedMode) this.selectedMode = 'player';

      this.classroomService.updateUserState(
        this.classroomId,
        this.userId,
        this.username,
        this.selectedMode
      );
      
      this.roomGeneratedEvent.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }
}
