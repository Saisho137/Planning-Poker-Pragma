import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomI } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-left-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './left-module.component.html',
  styleUrl: './left-module.component.scss',
})
export class LeftModuleComponent {
  @Input() votationFinished = false;
  @Input() selectedCard = '';

  @Input({ required: true }) roomId = '';
  @Input() room: ClassroomI| undefined = {
    id: '',
    admin: [],
    users: [],
  };
}
