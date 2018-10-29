import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CustomersService } from '../customers.service';
import { Customers, Customer } from '../models/customer';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  customers: Customers = [];
  sub1: Subscription

  constructor(private customersService: CustomersService, private route: ActivatedRoute) {
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

  getDetails() {
    if (this.sub1) { this.sub1.unsubscribe() };
  }

  deleteCustomer(id: number) {
    if (this.sub1) { this.sub1.unsubscribe() };
    this.customersService.delete(id)
      .subscribe(() => {
        this.customersService.list()
          .subscribe((list: Customers) => {
            this.customers = list;
          });
      })
  }
}
