import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product!: Product;

  @Output() productEventEmitter = new EventEmitter();

  addItem(): void {
    this.productEventEmitter.emit(this.product);
  }
}
