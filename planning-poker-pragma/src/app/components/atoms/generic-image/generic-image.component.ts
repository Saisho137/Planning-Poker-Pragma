import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-generic-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './generic-image.component.html',
  styleUrl: './generic-image.component.scss',
})
export class GenericImageComponent {
  @Input() imgUrl: string = '';
  @Input() imgAlt: string = '';
  @Input() imgWidth: string = '';
  @Input() imgHeight: string = '';
}
