import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';

@Component({
  selector: 'app-invitation-link',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent, GenericInputComponent],
  templateUrl: './invitation-link.component.html',
  styleUrl: './invitation-link.component.css',
})
export class InvitationLinkComponent {}