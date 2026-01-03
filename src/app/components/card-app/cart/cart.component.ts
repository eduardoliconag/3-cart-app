import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  
  cardItems: CartItem[] = [];
  totalCart: number = 0;

  idProductEventEmitter = new EventEmitter();

  constructor(private sharingDataService: SharingDataService, private router: Router) {
    debugger;
    this.cardItems = this.router.getCurrentNavigation()?.extras.state?.['cardItems'] || [];
    this.totalCart = this.router.getCurrentNavigation()?.extras.state?.['totalCart'] || 0;
  }
  
  deleteCartItem(id: number): void {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }

  clearCart(): void {
    this.cardItems = [];
    this.totalCart = 0;
    sessionStorage.clear();
  }
}


