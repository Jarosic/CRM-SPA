import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer, Customers } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customerSer: Customer;
  changeData: EventEmitter<Customer> = new EventEmitter();

  baseUrl = 'https://5bafa4ed73f71400140d3c25.mockapi.io';

  constructor(private http: HttpClient) { }

  list(): Observable<Customers> {
    return this.http.get<Customers>(`${this.baseUrl}/customers`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }

  saveDataCustomer(data: Customer): void {
    this.customerSer = data;
    this.changeData.emit(this.customerSer);
  }

  createCustomer(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, data);
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}/customers/${id}`);
  }
}
