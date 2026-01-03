import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _productEventEmitter: EventEmitter<Product> = new EventEmitter();
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter;
  }

  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }
}
