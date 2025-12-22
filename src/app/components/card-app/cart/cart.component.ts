import { AfterViewInit, Component, DestroyRef, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { headBusService } from '../../../service/head-services/head.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, distinctUntilChanged, filter, fromEvent, map, startWith } from 'rxjs';

declare const bootstrap: any; // o importa bootstrap como módulo si lo tienes así

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnChanges {
  
  @Input() cardItems: CartItem[] = [];
  @Input() totalCart: number = 0;
  @Output() idProductEventEmitter = new EventEmitter();

  //@ViewChild('offcanvasNavbar') offcanvasNavbar!: ElementRef<HTMLElement>;

  // private destroyRef = inject(DestroyRef);
  // private offcanvasInstance!: any;

  width = window.innerWidth;

  //constructor(private offcanvasBus: headBusService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();
  }

  // ngOnInit(): void {
  //   fromEvent(window, 'resize').pipe(
  //     auditTime(100),               // evita spam al redimensionar
  //     startWith(null),              // corre una vez al cargar
  //     map(() => window.innerWidth <= 1200),
  //     distinctUntilChanged(),       // solo cuando cambia true/false
  //     takeUntilDestroyed(this.destroyRef)
  //   ).subscribe((isSmall) => {
  //     if (isSmall) this.offcanvasBus.openCart();
  //     else this.offcanvasBus.closeCart();
  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(
  //     this.offcanvasNavbar.nativeElement
  //   );

  //   this.offcanvasBus.openCart$
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => this.offcanvasInstance.show());

  //   this.offcanvasBus.closeCart$
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => this.offcanvasInstance.hide());
  // }

  calculateTotal(): void {
    this.totalCart = this.cardItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  saveSession(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cardItems));
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


