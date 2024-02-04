import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomI } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-right-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './right-module.component.html',
  styleUrl: './right-module.component.scss',
})
export class RightModuleComponent {
  @Input() votationFinished: boolean = false;
  @Input() selectedCard = '';

  @Input({ required: true }) roomId = '';
  @Input() room: ClassroomI| undefined = {
    id: '',
    admin: [],
    users: [],
  };
}
