import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor() { }
  getProducts() {
  return [
      {
        id: 'P-101',
        name: 'Logitech Mouse',
        description: '6 Button Mechanical Mouse',
        price: 899.00
      },
      {
        id: 'P-102',
        name: 'JBL BT Speaker',
        description: 'Waterproof Radio 360 Surround',
        price: 1099.00
      },
      {
        id: 'P-103',
        name: 'Mechanical KeyBoard',
        description: 'Hot-swappable RGB Backlit',
        price: 2395.00
      },
      {
        id: 'P-104',
        name: 'Oculus Meta',
        description: 'All-in-one Gaming Headset',
        price: 22450.00
      }
    ];
  }
}
