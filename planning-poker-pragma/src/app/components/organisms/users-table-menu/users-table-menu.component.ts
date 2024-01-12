import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../molecules/user-card/user-card.component';
import { ClassroomInterface } from '../../../interfaces/classroom-interface';
import { TableComponent } from '../../../pages/classroom/table/table.component';
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
    BottomModuleComponent,
  ],
  templateUrl: './users-table-menu.component.html',
  styleUrl: './users-table-menu.component.scss',
})
export class UsersTableMenuComponent {
  @Input() selectedCard: string = '';
  @Input() buttonText: string = '';
  @Input() allPlayersSelected: boolean = false;
  @Input() votationFinished: boolean = false;
  @Input() room: ClassroomInterface | undefined = {
    id: '',
    admin: '',
    users: [],
  };
  @Output() clickEventReveal: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickEventRestart: EventEmitter<void> = new EventEmitter<void>();

  revealClick() {
    this.clickEventReveal.emit();
  }
  restartClick() {
    this.clickEventRestart.emit();
  }
}
