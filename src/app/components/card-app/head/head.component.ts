import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
})
export class HeadComponent {
  @Input() cardItems: CartItem[] = [];
  @Input() totalQuantity: number = 0;
  @Input() totalCart: number = 0;

  @Output() openSidebarEventEmitter = new EventEmitter();

}
