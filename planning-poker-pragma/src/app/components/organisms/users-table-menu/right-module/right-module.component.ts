import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomInterface } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-right-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './right-module.component.html',
  styleUrl: './right-module.component.css',
})
export class RightModuleComponent {
  @Input() selectedCard: string = '';
  @Input() votationFinished: boolean = false;
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
}
