import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

}
