import { Component, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';

import { CustomersService } from '../customers.service';
import { Customers, Customer } from '../models/customer';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  customers: Customers = [];
  @Output() getId: EventEmitter<number> = new EventEmitter();

  constructor(private customersService: CustomersService, private router: Router) {
    this.customersService.list()
      .subscribe((data: Customers) => {
        this.customers = data;
      });

    this.customersService.changeData.subscribe((data: Customer) => {
      this.customersService.createCustomer(data)
        .subscribe(() => {
          this.customersService.list()
            .subscribe((list: Customers) => {
            this.customers = list;
          });
        });
    });
  }

  getDetails(id: number) {
    this.getId.emit(id);
  }
}
