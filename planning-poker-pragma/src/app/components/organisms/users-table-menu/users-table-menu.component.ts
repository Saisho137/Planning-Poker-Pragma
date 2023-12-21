import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../molecules/user-card/user-card.component';
import { ClassroomInterface } from '../../../interfaces/classroom-interface';
import { TableComponent } from '../../molecules/table/table.component';
import { TopModuleComponent } from './top-module/top-module.component';
import { LeftModuleComponent } from './left-module/left-module.component';
import { RightModuleComponent } from './right-module/right-module.component';
import { BottomModuleComponent } from './bottom-module/bottom-module.component';

@Component({
  selector: 'app-users-table-menu',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    TableComponent,
    TopModuleComponent,
    LeftModuleComponent,
    RightModuleComponent,
    BottomModuleComponent
  ],
  templateUrl: './users-table-menu.component.html',
  styleUrl: './users-table-menu.component.css',
})
export class UsersTableMenuComponent {
  @Input() selectedCard: string = '';
  @Input() allPlayersSelected: boolean = false;
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
}
