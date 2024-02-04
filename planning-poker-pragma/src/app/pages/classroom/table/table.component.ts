import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/atoms/button/button.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() allPlayersSelected: boolean = false;
  @Input() votationFinished: boolean = false;
  @Input() buttonText = '';

  @Output() clickEventReveal: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickEventRestart: EventEmitter<void> = new EventEmitter<void>();

  revealClick() {
    this.clickEventReveal.emit();
  }
  
  restartClick() {
    this.clickEventRestart.emit();
  }
}
