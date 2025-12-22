import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
//import { headBusService } from '../../../service/head-services/head.service';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
})
export class HeadComponent {
  @Input() cardItems: CartItem[] = [];
  @Input() totalQuantity: number = 0;

  @Output() openSidebarEventEmitter = new EventEmitter();

  //constructor(private cartSidebar: headBusService) {}

  openCart(): void {
    //if (window.innerWidth <= 1200) {
      this.openSidebarEventEmitter.emit();
    //}
  }
}
