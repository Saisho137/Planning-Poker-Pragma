import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'image-atom',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './generic-image.component.html',
  styleUrl: './generic-image.component.scss',
})
export class GenericImageComponent {
  @Input() imgUrl = '/';
  @Input() imgAlt = '';
  @Input() imgWidth = '1';
  @Input() imgHeight = '1';
}
