import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private customersService: CustomersService) {
    this.customersService.changeData.subscribe(data => this.customer = data)
  }

  customer:Customer;

  ngOnInit() {
    
  }
}
