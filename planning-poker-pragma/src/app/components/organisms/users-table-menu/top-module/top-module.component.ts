import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomInterface } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-top-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './top-module.component.html',
  styleUrl: './top-module.component.scss',
})
export class TopModuleComponent {
  @Input() selectedCard: string = '';
  @Input() votationFinished: boolean = false;
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
}
