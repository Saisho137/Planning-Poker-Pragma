import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() allPlayersSelected: boolean = false;
  @Input() votationFinished: boolean = false;
  @Input() buttonText: string = '';

  @Output() clickEventReveal: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickEventRestart: EventEmitter<void> = new EventEmitter<void>();

  revealClick() {
    this.clickEventReveal.emit();
  }
  restartClick() {
    this.clickEventRestart.emit();
  }
}
