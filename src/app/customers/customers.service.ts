import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer, Customers } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  changeData: EventEmitter<Customer> = new EventEmitter();
  newList: EventEmitter<Customer> = new EventEmitter();

  baseUrl = 'https://5bafa4ed73f71400140d3c25.mockapi.io';

  constructor(private http: HttpClient) { }

  list(): Observable<Customers> {
    return this.http.get<Customers>(`${this.baseUrl}/customers`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }

  saveDataCustomer(data: Customer): void {
    this.changeData.emit(data);
  }

  updateList(data) {
    this.newList.emit(data);
  }

  createCustomer(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, data);
  }

  editCustomer(id: number, data: Customer) {
    return this.http.put<Customer>(`${this.baseUrl}/customers/${id}`, data)
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}/customers/${id}`);
  }
}
