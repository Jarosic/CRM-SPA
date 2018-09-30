import { Component, OnInit, } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customers, Customer } from '../models/customer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  customers: Customers = [];
  
  constructor(private customersService: CustomersService) { }

  customer: Customer;

  ngOnInit() {
    this.customersService.list()
      .subscribe((data: Customers) => { 
        this.customers = data;
      });
  }

  getDetails(id: number) {
    this.customersService.getCustomer(id)
      .subscribe((data) => {
        this.customer = data
        this.customersService.saveDataCustomer(data);
      });
  }
}
