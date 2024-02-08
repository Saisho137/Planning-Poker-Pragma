import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonComponent } from '../../../components/atoms/button/button.component';
import { InputComponent } from '../../../components/atoms/input/input.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-invitation-link',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent],
  templateUrl: './invitation-link.component.html',
  styleUrl: './invitation-link.component.scss',
})
export class InvitationLinkComponent {
  public link = '';
  
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
