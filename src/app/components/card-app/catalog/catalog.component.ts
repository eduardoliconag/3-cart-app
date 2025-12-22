import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Product } from '../../../models/product';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  @Input() products!: Product[];
  @Output() addItemEventEmitter = new EventEmitter();

  onAddItem(elem: {}): void {
    this.addItemEventEmitter.emit(elem);
  }
}
