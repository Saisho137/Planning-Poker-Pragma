import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomI } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-bottom-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './bottom-module.component.html',
  styleUrl: './bottom-module.component.scss',
})
export class BottomModuleComponent {
  @Input() votationFinished = false;
  @Input() selectedCard = '';

  @Input({ required: true }) roomId = '';
  @Input() room: ClassroomI| undefined = {
    id: '',
    admin: [],
    users: [],
  };
}
