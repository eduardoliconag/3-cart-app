import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product!: Product;

  @Output() addItemEventEmitter = new EventEmitter();

  addItem(): void {
    this.addItemEventEmitter.emit(this.product);
  }
}
