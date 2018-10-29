import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CustomersService } from '../customers.service';
import { Customers, Customer } from '../models/customer';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  customers: Customers;

  constructor(private customersService: CustomersService, private route: ActivatedRoute) {
    this.customersService.list()
      .subscribe((data: Customers) => {
        this.customers = data;
      });

    this.customersService.changeData.pipe(
      switchMap((data: Customer) => {
        return this.customersService.createCustomer(data);
      }),
      switchMap(() => {
        return this.customersService.list();
      })
    ).subscribe((data: Customers) => {
      this.customers = data;
    });

    customersService.newList.subscribe((data: Customers) => {
      this.customers = data;
    });
  }

  deleteCustomer(id: number) {
    this.customersService.deleteCustomer(id).pipe(
      switchMap(() => {
        return this.customersService.list();
      })
    ).subscribe((data: Customers) => {
      this.customers = data;
    });
  }
}
