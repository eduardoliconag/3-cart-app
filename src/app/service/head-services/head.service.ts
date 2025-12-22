import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class headBusService {
  private openCartSubject = new Subject<void>();
  private closeCartSubject = new Subject<void>();
  openCart$ = this.openCartSubject.asObservable();
  closeCart$ = this.closeCartSubject.asObservable();

  openCart(): void {
    this.openCartSubject.next();
  }

  closeCart(): void {
    this.closeCartSubject.next();
  }
}
