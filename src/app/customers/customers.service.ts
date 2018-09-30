import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, Customers } from './models/customer';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customerSer: Customer;
  changeData: EventEmitter<Customer> = new EventEmitter()

  baseUrl = 'https://5bafa4ed73f71400140d3c25.mockapi.io/customers';

  constructor(private http: HttpClient) { }

  list(): Observable<Customers> {
    return this.http.get<Customers>(this.baseUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  saveDataCustomer(data) {
    this.customerSer = data;
    this.changeData.emit(this.customerSer) 
  }

  createCustomer(data) {
    return this.http.post<Customer>(this.baseUrl , data)
  }
}
