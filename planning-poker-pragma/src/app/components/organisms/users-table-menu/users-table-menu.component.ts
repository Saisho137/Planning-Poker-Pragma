import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../molecules/user-card/user-card.component';
import { ClassroomInterface } from '../../../interfaces/classroom-interface';
import { TableComponent } from '../../molecules/table/table.component';

@Component({
  selector: 'app-users-table-menu',
  standalone: true,
  imports: [CommonModule, UserCardComponent, TableComponent],
  templateUrl: './users-table-menu.component.html',
  styleUrl: './users-table-menu.component.css',
})
export class UsersTableMenuComponent {
  @Input() selectedCard: string = '';
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
}
