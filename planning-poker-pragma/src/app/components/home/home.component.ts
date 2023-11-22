import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('session_token');

    if (token == null) {
      this.router.navigate(['/login']);
    }
  }
}
