import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomInterface } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-left-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './left-module.component.html',
  styleUrl: './left-module.component.css',
})
export class LeftModuleComponent {
  @Input() selectedCard: string = '';
  @Input() votationFinished: boolean = false;
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
}
