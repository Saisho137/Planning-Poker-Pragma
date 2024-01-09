import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomInterface } from '../../../../interfaces/classroom-interface';
import { UserCardComponent } from '../../../molecules/user-card/user-card.component';

@Component({
  selector: 'app-bottom-module',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './bottom-module.component.html',
  styleUrl: './bottom-module.component.scss',
})
export class BottomModuleComponent {
  @Input() selectedCard: string = '';
  @Input() votationFinished: boolean = false;
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
}
