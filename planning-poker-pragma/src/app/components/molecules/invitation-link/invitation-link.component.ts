import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-invitation-link',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent, GenericInputComponent],
  templateUrl: './invitation-link.component.html',
  styleUrl: './invitation-link.component.css',
})
export class InvitationLinkComponent {
  @Input() link: string = '';
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private clipboard: Clipboard, private location: Location) {}

  ngOnInit() {
    this.link = window.location.origin + this.location.path();
  }

  copyUrl(): void {
    this.clipboard.copy(this.link);
    alert('Copiado con éxito');
  }

  onButtonClick() {
    this.clickEvent.emit();
  }
}
