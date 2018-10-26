import { Component } from '@angular/core';

import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent {
  constructor(private customersService: CustomersService) {
  }

  getId(id: number) {
    this.customersService.getCustomer(id)
      .subscribe((data) => {
        this.customersService.saveDataCustomer(data);
      });
  }
}
