import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer, Customers } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  changeData: EventEmitter<Customer> = new EventEmitter();
  newList: EventEmitter<Customer> = new EventEmitter();
  baseUrl = 'https://5bafa4ed73f71400140d3c25.mockapi.io';

  constructor(private http: HttpClient) { }

   private handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
     } else {
       console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
        );
        return throwError(
          'Something bad happened; please try again later.'
        );
     }
   }

  list(): Observable<Customers> {
    return this.http.get<Customers>(`${this.baseUrl}/customers`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveDataCustomer(data: Customer): void {
    this.changeData.emit(data);
  }

  updateList(data) {
    this.newList.emit(data);
  }

  createCustomer(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  editCustomer(id: number, data: Customer) {
    return this.http.put<Customer>(`${this.baseUrl}/customers/${id}`, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}/customers/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }
}
