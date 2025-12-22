import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/peoduct.data';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  items: CartItem[] = [];
  constructor() {}

  findAll(): Product[] {
    return products;
  }

  // addProduct(product: Product): CartItem[] {
  //   let d = this.items
  //   return [...items, { product, quantity: 1 }];
  // }
}
