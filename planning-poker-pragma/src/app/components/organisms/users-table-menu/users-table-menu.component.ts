import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../molecules/user-card/user-card.component';
import { ClassroomI } from '../../../interfaces/classroom-interface';
import { TableComponent } from '../../../pages/classroom/table/table.component';
import { TopModuleComponent } from './top-module/top-module.component';
import { LeftModuleComponent } from './left-module/left-module.component';
import { RightModuleComponent } from './right-module/right-module.component';
import { BottomModuleComponent } from './bottom-module/bottom-module.component';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';

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
  public room: ClassroomI | undefined;

  @Input({ required: true }) roomId = '';
  @Input() selectedCard = '';
  @Input() buttonText = '';
  @Input() allPlayersSelected = false;
  @Input() votationFinished = false;

  @Output() clickEventReveal: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickEventRestart: EventEmitter<void> = new EventEmitter<void>();

  constructor(private classroomService: ClassroomsService) {}

  ngOnInit() {
    this.room = this.classroomService.getRoom(this.roomId);
  }

  revealClick() {
    this.clickEventReveal.emit();
  }

  restartClick() {
    this.clickEventRestart.emit();
  }
}
