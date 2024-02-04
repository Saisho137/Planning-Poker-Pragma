import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomI } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-top-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './top-module.component.html',
  styleUrl: './top-module.component.scss',
})
export class TopModuleComponent {
  @Input() votationFinished: boolean = false;
  @Input() selectedCard = '';

  @Input({ required: true }) roomId = '';
  @Input() room: ClassroomI| undefined = {
    id: '',
    admin: [],
    users: [],
  };
}
