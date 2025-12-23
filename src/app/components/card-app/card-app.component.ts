import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { HeadComponent } from './head/head.component';
import { RouterOutlet } from '@angular/router';
//import { AllMaterialModules } from '../../modulos/AllMaterialModules.module';

declare const bootstrap: any; 

@Component({
  selector: 'card-app',
  standalone: true,
  imports: [HeadComponent, CatalogComponent, RouterOutlet],
  templateUrl: './card-app.component.html',
  styleUrl: './card-app.component.css',
  host: { class: 'centered-layout' },
})
export class CardAppComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  cardItems: CartItem[] = [];
  totalCart: number = 0;
  totalQuantity: number = 0;

  @ViewChild('offcanvasNavbar', { read: ElementRef }) 
  offcanvasNavbar!: ElementRef<HTMLElement>;

  private offcanvasInstance!: any;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.cardItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    //this.updateCart();
  }

  ngAfterViewInit() {
    this.offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(this.offcanvasNavbar.nativeElement);
  }

  onAddItem(product: Product): void {
    const hasItem = this.cardItems.find((i) => i.product.id === product.id);
    if (hasItem) {
      this.cardItems = this.cardItems.map((i) => {
        if (i.product.id === product.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
    } else {
      this.cardItems = [
        ...this.cardItems,
        { product: { ...product }, quantity: 1 },
      ];
    }
    // this.updateCart();
    // this.saveSession();
  }

  onDeleteCart(id: number): void {
    const hasItem = this.cardItems.find((i) => i.product.id === id);
    if (hasItem) {
      if (hasItem.quantity === 1) {
        this.cardItems = this.cardItems.filter(
          (item) => item.product.id !== id
        );
      } else {
        this.cardItems = this.cardItems.map((i) => {
          if (i.product.id === id) {
            return { ...i, quantity: i.quantity - 1 };
          }
          return i;
        });
      }
    }

    // this.updateCart();
    // this.saveSession();
  }

  // calculateTotal(): void {
  //   this.totalCart = this.cardItems.reduce(
  //     (acc, item) => acc + item.product.price * item.quantity,
  //     0
  //   );
  // }

  // setTotalQuantity(): void {
  //   this.totalQuantity = this.cardItems.reduce(
  //     (acc, item) => acc + item.quantity,
  //     0
  //   );
  // }

  // updateCart(): void {
  //   this.calculateTotal();
  //   this.setTotalQuantity();
  // }

  openCart(): void {
    this.offcanvasInstance?.show();
  }

}
