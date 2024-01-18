import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { Subscription } from 'rxjs';
import { UserI } from '../../../interfaces/user-interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  public defaultUser: string = '';

  private userId: string = '';
  private getAllUsersSubscription: Subscription | undefined;

  @Input() roomId: string = '';
  @Input() cardValue: string = '';
  @Input() selectedCard: string = '';
  @Input() visualization: string = '';
  @Input() votationFinished: boolean = false;

  constructor(private classroomService: ClassroomsService, private userService: UsersService) {}

  ngOnInit() {
    this.getAllUsersSubscription = this.userService.getAllUsers().subscribe({
      next: (users: UserI[]) => {
        const { _id: userId } = users.find((user) => user.username === this.cardValue) || {}
        this.userId = userId || '0000';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onClick() {
    this.classroomService.makeUserAdmin(this.roomId, this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardValue']) {
      const newCardValue = changes['cardValue'].currentValue;
      this.defaultUser = newCardValue.substring(0, 2).toUpperCase();
    }
  }

  ngOnDestroy() {
    if (this.getAllUsersSubscription) {
      this.getAllUsersSubscription.unsubscribe();
    }
  }
}
