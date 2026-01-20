import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from './employee';
import { Products } from './products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [Employee, Products]
})
export class App {
  public employees: {
    id: number,
    firstname: string,
    lastname: string,
    email: string
  }[] = [];

  public products: {
    id: string,
    name: string,
    description: string,
    price: number
  }[] = [];

  constructor(
    private _employeeService: Employee,
    private _productsService: Products
  ) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.products = this._productsService.getProducts();
  }
}
