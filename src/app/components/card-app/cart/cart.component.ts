import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  
  @Input() cardItems: CartItem[] = [];
  @Input() totalCart: number = 0;
  @Output() idProductEventEmitter = new EventEmitter();

  constructor(private router: Router) {
    this.cardItems = this.router.getCurrentNavigation()?.extras.state?.['cardItems'] || [];
  }
  
  deleteCartItem(id: number): void {
    this.idProductEventEmitter.emit(id);
  }

  clearCart(): void {
    this.cardItems = [];
    this.totalCart = 0;
    sessionStorage.clear();
  }
}


