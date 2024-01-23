import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { GenericImageComponent } from '../../atoms/image/generic-image.component';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, GenericImageComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public username: string = '';

  private subscription: Subscription | undefined;

  @Input() buttonText: string = '';
  @Input() tittle: string = '';
  @Input() imgUrl: string = '/';
  @Input() roomId: string = '';

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.subscription = this.userService.username$.subscribe((username) => {
      if (username) this.username = username.substring(0, 2).toUpperCase();
      else this.username = 'ERR';
    });
  }

  onButtonClick() {
    this.clickEvent.emit();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
