import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrls: ['./cart-app.component.css'],
  host: { class: 'centered-layout' },
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private sharingDataService: SharingDataService, 
    private router: Router) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(prod => {
      this.addItem(prod)
      this.router.navigate(['/cart'], { 
        state: { 
          items: this.items, total: this.total 
        } 
      });
      Swal.fire({
        title: 'Carro de Compras',
        text: 'Producto agregado al carro de compras',
        icon: 'success',
      })
    }); 
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Carro de Compras",
        text: "¿Estás seguro de eliminar este producto del carro de compras?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItem(id);
          this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/cart'], { 
              state: { 
                items: this.items, total: this.total 
              } 
            });
            Swal.fire({
              title: "Eliminado!",
              text: "Tu producto ha sido eliminado del carro de compras.",
              icon: "success"
            });
          });
        }
      });
    });
  }

  addItem(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }];
    }

    this.calculateTotal();
    this.saveSession();
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);
    if (this.items.length == 0) {
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
